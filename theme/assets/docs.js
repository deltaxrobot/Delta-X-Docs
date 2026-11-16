(() => {
  'use strict';
  const script = document.querySelector('script[data-docs-script]');
  const root = new URL('../', script.src);
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const dialog = $('.search-dialog');
  const searchInput = $('#docs-search');
  const modelSelect = $('#search-model');
  const results = $('#search-results');
  let indexPromise;
  let indexData = [];
  let requestNumber = 0;
  let debounce;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function notify(message) {
    const toast = $('.toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }

  function normalize(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\b(?:delta[\s-]*)?x[\s-]*s\b/g, 'xs')
      .replace(/\b(?:delta[\s-]*)?x[\s-]*([123])\b/g, 'x$1')
      .replace(/\b([gm])0+(\d+)\b/g, '$1$2');
  }

  const synonyms = {
    home: ['homing', 'g28'], homing: ['home', 'g28'],
    suction: ['vacuum'], vacuum: ['suction'],
    wiring: ['pinout', 'input', 'output', 'connection'],
    pinout: ['wiring', 'pins'], speed: ['feedrate', 'velocity'],
    feedrate: ['speed', 'velocity'], connection: ['connect', 'communication'],
  };

  async function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(new URL('assets/doc-index.json', root))
        .then(response => {
          if (!response.ok) throw new Error('Search index unavailable');
          return response.json();
        })
        .then(data => {
          indexData = data.map(record => ({ ...record,
            normalizedTitle: normalize(record.title),
            normalizedModel: normalize([...(record.search_models || [record.model]), ...(record.search_aliases || [])].join(' ')),
            normalizedCodes: record.codes.map(normalize),
            haystack: normalize([record.title, ...(record.search_models || [record.model]), ...(record.search_aliases || []), record.category, record.page, record.text].join(' ')),
          }));
          const selected = modelSelect.value;
          const models = [...new Set(data.flatMap(record => record.search_models || [record.model]))]
            .filter(model => !['All models', 'Delta X S'].includes(model)).sort();
          for (const model of models) {
            const option = element('option', '', model);
            option.value = model;
            modelSelect.append(option);
          }
          modelSelect.value = models.includes(selected) ? selected : 'all';
          return indexData;
        })
        .catch(error => { indexPromise = null; throw error; });
    }
    return indexPromise;
  }

  function emptyState(title, description) {
    const state = element('div', 'search-empty');
    const icon = element('i', 'fa fa-search');
    icon.setAttribute('aria-hidden', 'true');
    state.append(icon, element('h2', '', title), element('p', '', description));
    results.replaceChildren(state);
  }

  function score(record, terms) {
    let total = 0;
    for (const term of terms) {
      const codeQuery = /^[gm]\d+$/.test(term);
      if (codeQuery) {
        // G1 must not match G10/G100; zero-padded command forms are equivalent.
        const exact = record.normalizedCodes.includes(term);
        const bodyMatch = new RegExp('\\b' + term + '\\b').test(record.haystack);
        if (!exact && !bodyMatch) return 0;
        total += exact ? 180 : 5;
        continue;
      }
      const variants = [term, ...(synonyms[term] || [])];
      let best = 0;
      for (const variant of variants) {
        if (record.normalizedTitle.includes(variant)) best = Math.max(best, variant === term ? 35 : 20);
        if (record.normalizedModel.includes(variant)) best = Math.max(best, 25);
        if (record.haystack.includes(variant)) best = Math.max(best, 4);
      }
      if (!best) return 0;
      total += best;
    }
    return total;
  }

  function renderResults(data, query) {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
    const filter = modelSelect.value;
    const ranked = data.filter(record => filter === 'all' ||
      (record.search_models || [record.model]).includes(filter) || record.model === 'All models')
      .map(record => ({ record, score: score(record, terms) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title));
    const matches = ranked.slice(0, 40);
    $('#search-count').textContent = `${ranked.length} result${ranked.length === 1 ? '' : 's'}`;
    if (!matches.length) {
      emptyState('No matching documentation', 'Try a shorter query or switch to All models.');
      if (filter !== 'all') {
        const reset = element('button', 'button secondary', 'Search all models');
        reset.addEventListener('click', () => { modelSelect.value = 'all'; runSearch(); });
        $('.search-empty', results).append(reset);
      }
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const { record } of matches) {
      const link = element('a', 'search-result');
      link.href = new URL(record.url, root).href;
      const meta = element('span', 'result-meta');
      meta.append(element('span', 'pill accent', record.model), element('span', '', record.category));
      if (record.family_guide) meta.append(element('span', 'family-label', 'X S family guide'));
      link.append(meta, element('span', 'result-title', record.title));
      if (record.page !== record.title) link.append(element('span', 'result-page', record.page));
      const description = record.text.replace(/^(Descriptions?|Introduction)\s*/i, '').split(/\s(?:Usage|Parameters|Example)\b/)[0];
      const excerpt = description.slice(0, 165);
      if (excerpt) link.append(element('span', 'result-description', excerpt + (description.length > 165 ? '…' : '')));
      if (record.syntax) link.append(element('span', 'result-syntax', record.syntax));
      link.addEventListener('click', () => dialog.close());
      fragment.append(link);
    }
    results.replaceChildren(fragment);
    results.scrollTop = 0;
  }

  async function runSearch() {
    const number = ++requestNumber;
    const query = searchInput.value.trim();
    if (!query) {
      $('#search-count').textContent = '';
      emptyState('What are you working on?', 'Try a command like G28, a model, or a topic like wiring.');
      return;
    }
    $('#search-count').textContent = 'Searching…';
    try {
      const data = await loadIndex();
      if (number !== requestNumber) return;
      renderResults(data, query);
    } catch (_) {
      if (number !== requestNumber) return;
      $('#search-count').textContent = '';
      emptyState('Search could not load', 'Check your connection and try again. The navigation menu is still available.');
      const retry = element('button', 'button secondary', 'Try again');
      retry.addEventListener('click', runSearch);
      $('.search-empty', results).append(retry);
    }
  }

  async function openSearch(query, filter) {
    if (!dialog.open) dialog.showModal();
    searchInput.value = query === undefined ? searchInput.value : query;
    searchInput.focus();
    if (query === undefined) searchInput.select();
    try {
      await loadIndex();
      // Context is explicit in the visible select, and never hides the All models option.
      const desired = filter || document.body.dataset.model;
      modelSelect.value = Array.from(modelSelect.options).some(option => option.value === desired) ? desired : 'all';
    } catch (_) { /* runSearch renders the recoverable failure state. */ }
    runSearch();
  }

  $$('[data-open-search]').forEach(button => button.addEventListener('click', () => openSearch(undefined, button.dataset.searchModel)));
  $$('[data-search]').forEach(button => button.addEventListener('click', () => openSearch(button.dataset.search, 'all')));
  $('.close-search').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog && event.offsetY < 0) dialog.close(); });
  $('.search-form').addEventListener('submit', event => { event.preventDefault(); runSearch(); });
  searchInput.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(runSearch, 100); });
  modelSelect.addEventListener('change', runSearch);
  document.addEventListener('keydown', event => {
    const editing = event.target.matches('input, textarea, select, [contenteditable=true]');
    if ((event.key === '/' && !editing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
      event.preventDefault(); openSearch();
    }
    if (dialog.open && event.key === 'ArrowDown' && event.target === searchInput) {
      event.preventDefault(); $('.search-result')?.focus();
    }
  });
  results.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    const links = $$('.search-result', results);
    const index = links.indexOf(document.activeElement);
    const next = index + (event.key === 'ArrowDown' ? 1 : -1);
    if (next >= 0 && next < links.length) { event.preventDefault(); links[next].focus(); }
    else if (next < 0) { event.preventDefault(); searchInput.focus(); }
  });
  const query = new URLSearchParams(location.search).get('q');
  if (query !== null && location.pathname.endsWith('search.html')) openSearch(query, 'all');

  const firmwarePicker = $('#firmware-version');
  if (firmwarePicker) {
    const currentVersion = $('option[selected]', firmwarePicker).value;
    firmwarePicker.disabled = false;
    firmwarePicker.addEventListener('change', () => {
      if (firmwarePicker.value !== currentVersion) location.assign(firmwarePicker.value);
    });
    // Restore the page's version when navigating back from the other reference.
    window.addEventListener('pageshow', () => { firmwarePicker.value = currentVersion; });
  }

  const robotPicker = $('#robot-model');
  if (robotPicker) {
    robotPicker.disabled = false;
    robotPicker.addEventListener('change', () => {
      $$('[data-robot-panel]').forEach(panel => panel.hidden = panel.dataset.robotPanel !== robotPicker.value);
      $('#robot-picker-status').textContent = robotPicker.value ?
        `Documentation for ${robotPicker.selectedOptions[0].textContent}` : '';
    });
  }

  const themeButton = $('.theme-toggle');
  function syncThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    $('i', themeButton).className = `fa fa-${dark ? 'sun-o' : 'moon-o'}`;
  }
  syncThemeButton();
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('dx-theme', theme); } catch (_) {}
    syncThemeButton();
  });

  const sidebar = $('#sidebar');
  if (sidebar) {
    const menu = $('.mobile-menu');
    const backdrop = $('.sidebar-backdrop');
    function setMenu(open) {
      sidebar.classList.toggle('is-open', open);
      document.body.classList.toggle('navigation-open', open);
      menu.setAttribute('aria-expanded', String(open));
      backdrop.hidden = !open;
      sidebar.inert = window.matchMedia('(max-width:960px)').matches && !open;
      if (open) $('.close-menu').focus();
    }
    menu.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
    $('.close-menu').addEventListener('click', () => { setMenu(false); menu.focus(); });
    backdrop.addEventListener('click', () => setMenu(false));
    $$('a', sidebar).forEach(link => link.addEventListener('click', () => {
      if (window.matchMedia('(max-width:960px)').matches) setMenu(false);
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) { setMenu(false); menu.focus(); }
    });
    window.matchMedia('(min-width:961px)').addEventListener('change', () => setMenu(false));
    sidebar.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || !sidebar.classList.contains('is-open')) return;
      const focusable = $$('a[href], button, summary', sidebar).filter(node => node.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && event.target === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && event.target === last) { event.preventDefault(); first.focus(); }
    });
    setMenu(false);
    const currentPage = $('.sidebar-link.current');
    const sidebarScroll = $('.sidebar-scroll', sidebar);
    if (currentPage && sidebarScroll) {
      const itemTop = currentPage.getBoundingClientRect().top - sidebarScroll.getBoundingClientRect().top;
      sidebarScroll.scrollTop = Math.max(0, itemTop - sidebarScroll.clientHeight / 2);
    }
  }

  const commandFilter = $('#command-filter');
  commandFilter?.addEventListener('input', () => {
    const terms = normalize(commandFilter.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    $$('.command-grid a').forEach(link => {
      const text = normalize(link.dataset.command);
      const match = terms.every(term => /^[gm]\d+$/.test(term) ? new RegExp('\\b' + term + '\\b').test(text) : text.includes(term));
      link.hidden = !match;
      if (match) count++;
    });
    $$('.command-group').forEach(group => {
      group.hidden = !$$('.command-grid a', group).some(link => !link.hidden);
    });
    $('.command-empty').hidden = count !== 0;
  });

  $$('.prose pre').forEach(pre => {
    const code = $('code', pre);
    const source = code ? code.textContent : pre.textContent;
    const wrap = element('div', 'code-wrap');
    pre.before(wrap);
    const language = code?.className.replace('language-', '') || (document.body.dataset.model !== 'All models' ? 'G-code' : 'Code');
    const copy = element('button', 'copy-code');
    copy.type = 'button';
    const copyIcon = element('i', 'fa fa-copy');
    copyIcon.setAttribute('aria-hidden', 'true');
    copy.append(copyIcon, document.createTextNode('Copy'));
    copy.setAttribute('aria-label', 'Copy code');
    wrap.append(element('span', 'code-label', language), pre, copy);
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(source);
        copy.replaceChildren(element('i', 'fa fa-check'), document.createTextNode('Copied'));
        copy.setAttribute('aria-label', 'Code copied');
        setTimeout(() => { copy.replaceChildren(element('i', 'fa fa-copy'), document.createTextNode('Copy')); copy.setAttribute('aria-label', 'Copy code'); }, 1800);
      } catch (_) { notify('Select the code and copy it with Ctrl+C or Cmd+C.'); }
    });
    if (code && !code.className && /^[GM]\d/m.test(source)) {
      const fragment = document.createDocumentFragment();
      const lines = source.split('\n');
      lines.forEach((line, i) => {
        const split = line.indexOf(';');
        const command = split >= 0 ? line.slice(0, split) : line;
        const match = command.match(/^([GM]\d+)(.*)$/);
        if (match) fragment.append(element('span', 'token-command', match[1]), document.createTextNode(match[2]));
        else fragment.append(document.createTextNode(command));
        if (split >= 0) fragment.append(element('span', 'token-comment', line.slice(split)));
        if (i < lines.length - 1) fragment.append(document.createTextNode('\n'));
      });
      code.replaceChildren(fragment);
    }
  });
  $$('.prose table').forEach(table => {
    const wrap = element('div', 'table-wrap');
    wrap.tabIndex = 0;
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Scrollable reference table');
    table.before(wrap); wrap.append(table);
  });

  const imageDialog = $('.image-dialog');
  $$('.prose img').forEach(img => {
    img.loading = 'lazy';
    if (img.closest('a')) return;
    const open = element('button', 'image-expand');
    open.type = 'button';
    open.setAttribute('aria-label', `Enlarge image: ${img.alt || 'diagram'}`);
    img.before(open); open.append(img);
    const hint = element('span', 'image-expand-label');
    hint.append(element('i', 'fa fa-expand'), document.createTextNode('Click to enlarge'));
    open.append(hint);
    open.addEventListener('click', () => {
      const large = $('img', imageDialog);
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      $('p', imageDialog).textContent = img.alt.replace(/_/g, ' ');
      imageDialog.showModal();
    });
  });
  $('.close-image').addEventListener('click', () => imageDialog.close());

  const tocLinks = $$('.page-toc nav a');
  if ('IntersectionObserver' in window && tocLinks.length) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(item => item.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!entry) return;
      tocLinks.forEach(link => {
        const active = decodeURIComponent(link.hash.slice(1)) === entry.target.id;
        link.classList.toggle('active', active);
        if (!active) return;
        const rail = $('.page-toc');
        const bounds = rail.getBoundingClientRect();
        const target = link.getBoundingClientRect();
        if (target.top < bounds.top + 45 || target.bottom > bounds.bottom - 20) {
          rail.scrollTop += target.top - bounds.top - 60;
        }
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    const tocIds = new Set(tocLinks.map(link => decodeURIComponent(link.hash.slice(1))));
    tocIds.forEach(id => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
  }
  $$('.mobile-toc a').forEach(link => link.addEventListener('click', () => $('.mobile-toc').open = false));
})();
