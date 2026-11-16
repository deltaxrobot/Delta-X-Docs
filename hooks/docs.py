"""Presentation metadata and a model-aware, section-level documentation index."""

import html
import json
import posixpath
import re
import shutil
from pathlib import Path

from mkdocs.utils import get_relative_url

RECORDS = []
PAGE_LABELS = {}
ARCHIVED_PAGES = {
    "reference/macro_programming/macro_programming.md",
    "tutorials/control_guides/control_delta_x3.md",
    "tutorials/control_guides/control_delta_xs.md",
}
# Keep the existing X3 URL as the reference for the current firmware family.
X3_FIRMWARE_VERSIONS = {
    "reference/gcodes/gc_x3.md": "< 2.0.0",
    "reference/gcodes/gc_x3_v2.md": "> 2.0.0",
}
SEARCH_ALIASES = {
    "reference/gcodes/gc_industrial_conveyor.md": ["X Conveyor", "X Encoder", "XEncoder", "XConveyor"],
}
# Published subsection IDs from before the firmware reference updates.
LEGACY_ANCHORS = json.loads(Path(__file__).with_name("legacy_anchors.json").read_text(encoding="utf-8"))
# Publish the old image URLs as build artifacts, keeping only one source image.
LEGACY_IMAGES = json.loads(Path(__file__).with_name("legacy_images.json").read_text(encoding="utf-8"))
# Discovery scopes are explicit: never infer G-code compatibility from a family name.
FAMILY_GUIDES = {
    "tutorials/assembly_guides/xs_frame_assembly_guide.md": ["Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/control_delta_xs.md": ["Delta X S V4", "Delta X S V5"],
}
SHARED_GUIDES = {
    "tutorials/control_guides/termite.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/calibration.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/vision.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/pick_and_place.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/blockly.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/overview.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
    "tutorials/control_guides/deltaxstudio/daily_operation.md": ["Delta X 3", "Delta X S V4", "Delta X S V5"],
}
# All DeltaXStudio method pages share the same supported robot families.
SHARED_GUIDES.update({
    "tutorials/control_guides/deltaxstudio/" + name + ".md": ["Delta X 3", "Delta X S V4", "Delta X S V5"]
    for name in (
        "calibration/static", "calibration/automatic", "calibration/controlled-conveyor",
        "calibration/external-camera", "calibration/external-manual",
        "vision/ai", "vision/color", "vision/ai-template", "vision/color-template",
        "blockly/color-filtering", "blockly/color-pick-and-place", "blockly/color-template-matching",
        "blockly/stationary-pick-and-place", "blockly/conveyor-pick-and-place", "blockly/sort-two-types",
    )
})
TITLE_OVERRIDES = {
    "tutorials/assembly_guides/xs_assembly_guide.md": "Delta X S V5 — Assembly guide",
    "tutorials/assembly_guides/xs_v5_wiring_tutorial.md": "Delta X S V5 — I/O wiring guide",
    "tutorials/control_guides/control_delta_x2_by_arduino.md": "Control Delta X 2 with Arduino",
    "tutorials/application_guides/deltax_art.md": "Delta X drawing applications",
    "reference/macro_programming/macro_programming.md": "G-code macro programming",
    "reference/gcodes/useful_commands.md": "Useful G-code commands",
    "reference/gcodes/gc_encoder.md": "X Encoder documentation",
}
MODELS = [
    ("control_guides/termite.md", "Delta X 3 / Delta X S"),
    ("control_guides/deltaxstudio.md", "Delta X 3 / Delta X S"),
    ("control_guides/deltaxstudio/", "Delta X 3 / Delta X S"),
    ("control_delta_x3", "Delta X 3"), ("control_delta_xs", "Delta X S"),
    ("xs_assembly_guide", "Delta X S V5"),
    ("gc_xs_v5", "Delta X S V5"), ("delta_xs_v5", "Delta X S V5"),
    ("xs_v5", "Delta X S V5"), ("gc_xs_v4", "Delta X S V4"),
    ("delta_xs_v4", "Delta X S V4"), ("x2_plus", "Delta X 2 Plus"),
    ("gc_x3", "Delta X 3"), ("gc_industrial_conveyor", "XConveyor XEncoder"),
    ("industrial_conveyor", "X Conveyor"),
    ("gc_short_conveyor", "Short Conveyor"),
    ("gc_conveyor", "Desktop Conveyor"), ("conveyor_x", "Short Conveyor"),
    ("slider", "Slider X"), ("gc_encoder", "XConveyor XEncoder"),
    ("deltax1", "Delta X 1"), ("x1", "Delta X 1"),
    ("deltax2", "Delta X 2"), ("x2", "Delta X 2"),
    ("xs_assembly", "Delta X S"), ("xs_frame", "Delta X S"),
]


def plain(value):
    value = re.sub(r'<a\b[^>]*class="headerlink"[^>]*>.*?</a>', '', value, flags=re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', value))).strip()


def on_pre_build(config):
    RECORDS.clear()
    PAGE_LABELS.clear()


def presentation(source, title, markdown):
    model = next((label for pattern, label in MODELS if pattern in source), "All models")
    category = ("G-code" if "/gcodes/" in source else
                "Specifications" if "/specifications/" in source else
                "Programming" if "/macro_programming/" in source else
                "Guides" if source.startswith("tutorials/") else "Documentation")
    is_gcode = "/gcodes/gc_" in source
    heading = re.search(r'^#\s+(.+)$', markdown, re.M)
    label = plain(heading.group(1)) if heading else title
    size = re.search(r'/sp_v[45]_(d\d+)\.md$', source)
    if is_gcode:
        label = f"{model} — G-code reference"
    elif size:
        label = f"{model} {size.group(1).upper()} — Specifications"
    elif re.search(r'/sp_x[12](?:_plus)?\.md$', source):
        label = f"{model} — Specifications"
    label = TITLE_OVERRIDES.get(source, label)
    return dict(doc_model=model, doc_category=category, is_gcode=is_gcode,
                doc_title=label, doc_empty=not markdown.strip(),
                firmware_version=X3_FIRMWARE_VERSIONS.get(source),
                search_models=SHARED_GUIDES.get(source, [model, *FAMILY_GUIDES.get(source, [])]),
                search_aliases=SEARCH_ALIASES.get(source, []),
                family_guide=source in FAMILY_GUIDES)


def versioned_title(metadata):
    title = metadata["doc_title"]
    if metadata.get("firmware_version"):
        title += " · Firmware " + metadata["firmware_version"]
    return title


def on_nav(nav, config, files):
    # Next-page labels must exist even before that page's markdown is rendered.
    for item in nav.pages:
        source = item.file.src_uri
        markdown = Path(item.file.abs_src_path).read_text(encoding="utf-8")
        PAGE_LABELS[source] = versioned_title(presentation(source, item.title, markdown))
    return nav


def on_page_markdown(markdown, page, config, files):
    source = page.file.src_uri
    page.meta.update(presentation(source, page.title, markdown))
    if page.meta.get("redirect_to"):
        page.meta["is_gcode"] = False
    # Resolve repository-hosted illustrations locally, including in local previews.
    prefix = "https://raw.githubusercontent.com/deltaxrobot/Delta-X-Docs/master/docs/"
    markdown = re.sub(re.escape(prefix) + r'([^\s)"<>]+)',
                      lambda m: posixpath.relpath(m.group(1), posixpath.dirname(source) or "."), markdown)
    # Only explicitly planned illustrations may be absent. Adding the image at
    # its documented path automatically replaces the placeholder on the next build.
    planned = set(page.meta.get("planned_images", []))
    if planned:
        def planned_image(match):
            caption, target = match.groups()
            if target not in planned or (Path(page.file.abs_src_path).parent / target).is_file():
                return match.group(0)
            caption = html.escape(caption, quote=True)
            return (f'<div class="image-placeholder" role="img" aria-label="{caption} — illustration coming soon">'
                    f'<span>Illustration coming soon</span><p>{caption}</p></div>')
        markdown = re.sub(r'!\[([^\]]*)\]\(([^\s)]+)\)', planned_image, markdown)
    return markdown


def preserve_legacy_anchors(content, page):
    aliases = LEGACY_ANCHORS.get(page.file.src_uri)
    if not aliases:
        return content
    section = ""
    replacements = {}
    used = set()

    def heading(match):
        nonlocal section
        level, anchor = int(match.group(1)), match.group(2)
        node = match.group(0)
        title = plain(node)
        is_command = re.match(r'^[GM]\d+\s*-', title)
        if level == 2 or (level == 3 and is_command):
            section = anchor
            if level == 3:
                node = node.replace('<h3', '<h3 class="command-heading"', 1)
            elif title in page.meta.get("command_groups", []):
                node = node.replace('<h2', '<h2 class="command-group-heading"', 1)
            # Old generic IDs (e.g. #usage_1) must still lead to the same command.
            return ''.join(f'<span class="legacy-anchor" id="{alias}" data-legacy-target="{section}"></span>'
                           for alias in aliases.get(section, [])) + node
        if not section:
            return node
        # Scope new subsection links by command so inserting earlier sections no
        # longer changes their meaning or takes an ID reserved for an old link.
        base = section + "-" + re.sub(r'_\d+$', '', anchor)
        scoped = base
        suffix = 1
        while scoped in used:
            scoped = f"{base}_{suffix}"
            suffix += 1
        used.add(scoped)
        replacements[anchor] = scoped
        return node.replace(f'id="{anchor}"', f'id="{scoped}"', 1).replace(f'href="#{anchor}"', f'href="#{scoped}"')

    content = re.sub(r'<h([2-6])\b[^>]*id="([^"]+)"[^>]*>.*?</h\1>', heading, content, flags=re.S)

    def update_toc(items):
        for item in items:
            item.id = replacements.get(item.id, item.id)
            update_toc(item.children)

    update_toc(page.toc)
    return content


def on_page_content(content, page, config, files):
    # The visible title retains the original H1 anchor; the source H1 is hidden.
    heading = re.search(r'<h1\b[^>]*id="([^"]+)"', content)
    if heading:
        page.meta["doc_heading_id"] = heading.group(1)
        content = content[:heading.start()] + content[heading.start():].replace(f' id="{heading.group(1)}"', '', 1)
    content = preserve_legacy_anchors(content, page)
    if (page.meta.get("redirect_to") or page.file.src_uri in ARCHIVED_PAGES or
            page.file.src_uri.startswith("products/") or page.meta.get("doc_empty")):
        return content
    # Replace filename/placeholder alt text with the surrounding section's subject.
    subject = page.meta["doc_title"]
    def describe_image(match):
        nonlocal subject
        node = match.group(0)
        if node.startswith("<h"):
            subject = page.meta["doc_title"] if node.startswith("<h1") else plain(node)
            return node
        alt = re.search(r'\balt="([^"]*)"', node)
        if alt and (alt.group(1) in ("", "title") or
                    re.search(r'_|[a-z][A-Z]', alt.group(1))):
            label = html.escape(subject + " — illustration", quote=True)
            return node[:alt.start(1)] + label + node[alt.end(1):]
        return node
    content = re.sub(r'<h[1-4]\b[^>]*>.*?</h[1-4]>|<img\b[^>]*>', describe_image, content, flags=re.S)

    if page.meta["doc_category"] == "Specifications":
        # Put the original first specification table ahead of the product photograph.
        # Anchors and technical values are retained; only the image position changes.
        lead = re.match(r'(?P<h1>\s*<h1\b[^>]*>.*?</h1>\s*)(?P<image><p>\s*<img\b[^>]*>\s*</p>)\s*(?=<h2)', content, re.S)
        if lead:
            rest = content[lead.end():]
            table_end = rest.find("</table>")
            next_section = rest.find("<h2", 4)
            if table_end >= 0 and (next_section < 0 or table_end < next_section):
                after = table_end + len("</table>")
                photo = '<div class="spec-product-image">' + lead.group("image") + '</div>'
                content = lead.group("h1") + rest[:after] + photo + rest[after:]

    sections = [match for match in re.finditer(
        r'<h(?P<level>[23])\b[^>]*id="(?P<id>[^"]+)"[^>]*>(?P<title>.*?)</h(?P=level)>', content, re.S)
        if match.group("level") == "2" or
        (page.meta["is_gcode"] and re.match(r'^[GM]\d+\s*-', plain(match.group("title"))))]
    commands = []
    search_title = versioned_title(page.meta)
    command_groups = []
    active_group = None
    # One search record per meaningful section, never separate Usage/Example hits.
    for i, match in enumerate(sections):
        title = plain(match.group("title"))
        anchor = match.group("id")
        if match.group("level") == "2":
            active_group = None
            if title in page.meta.get("command_groups", []):
                active_group = dict(title=title, id=anchor, commands=[])
                command_groups.append(active_group)
        if title.lower().startswith(("contact", "about us", "conclusion")):
            continue
        body = content[match.end():sections[i + 1].start() if i + 1 < len(sections) else len(content)]
        code = re.search(r'<pre><code[^>]*>(.*?)</code></pre>', body, re.S)
        codes = re.findall(r'\b[GM]0*\d+\b', title.split(" - ")[0])
        entry = dict(title=title, model=page.meta["doc_model"], category=page.meta["doc_category"],
                     page=search_title, url=page.url + "#" + anchor,
                     search_models=page.meta["search_models"], family_guide=page.meta["family_guide"],
                     search_aliases=page.meta["search_aliases"],
                     text=plain(body), syntax=plain(code.group(1))[:180] if code else "",
                     codes=codes)
        RECORDS.append(entry)
        if page.meta["is_gcode"] and codes:
            command = dict(title=title, id=anchor, codes=", ".join(codes),
                           group=active_group["title"] if active_group is not None else "",
                           label=re.sub(r'^[GM0-9, ]+\s*-\s*', '', title))
            commands.append(command)
            if active_group is not None:
                active_group["commands"].append(command)
    page.meta["commands"] = commands
    page.meta["command_index_groups"] = command_groups
    if page.file.src_uri != "index.md":
        RECORDS.append(dict(title=search_title, model=page.meta["doc_model"],
                            search_models=page.meta["search_models"], family_guide=page.meta["family_guide"],
                            search_aliases=page.meta["search_aliases"],
                            category=page.meta["doc_category"], page=search_title,
                            url=page.url, text=plain(content)[:450], syntax="", codes=[]))
    # Keep anchors unchanged while making small, flat parameter lists scannable.
    if page.meta["is_gcode"]:
        def table(match):
            items = re.findall(r'<li>(.*?)</li>', match.group(2), re.S)
            if not items or any("<ul>" in item or "<ol>" in item for item in items):
                return match.group(0)
            rows = []
            for item in items:
                param = re.match(r'<code>(.*?)</code>\s*:?\s*(.*)', item, re.S)
                if not param:
                    return match.group(0)
                rows.append('<tr><td><code>' + param.group(1) + '</code></td><td>' + param.group(2) + '</td></tr>')
            return match.group(1) + '<table class="parameters"><thead><tr><th>Parameter</th><th>Description</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table>'
        content = re.sub(r'(<h[34][^>]*>Parameters?\b.*?</h[34]>\s*)<ul>((?:(?!<ul>).)*?)</ul>', table, content, flags=re.S)
    return content


def on_page_context(context, page, config, nav):
    context["asset_base"] = get_relative_url("", page.url) or "."
    if page.file.src_uri in X3_FIRMWARE_VERSIONS:
        pages = {item.file.src_uri: item for item in nav.pages}
        context["firmware_versions"] = [
            dict(label=label, url=pages[source].url, selected=source == page.file.src_uri)
            for source, label in X3_FIRMWARE_VERSIONS.items()
        ]
    for direction in ("previous", "next"):
        adjacent = getattr(page, direction + "_page")
        context[direction + "_title"] = PAGE_LABELS.get(adjacent.file.src_uri, adjacent.title) if adjacent else ""
    return context


def on_post_build(config):
    site = Path(config.site_dir)
    for old_path, new_path in LEGACY_IMAGES.items():
        target = site / old_path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(site / new_path, target)
    target = Path(config.site_dir) / "assets" / "doc-index.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(RECORDS, ensure_ascii=False), encoding="utf-8")
