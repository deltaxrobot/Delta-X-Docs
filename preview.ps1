param(
    [ValidateRange(1, 65535)]
    [int]$Port = 8000,
    [string]$BindAddress = '0.0.0.0'
)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$previewPython = Join-Path $PSScriptRoot '.venv/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $previewPython)) {
    python -m venv .venv
    if ($LASTEXITCODE -ne 0) { throw 'Could not create the Python environment.' }
}
$previewPython = (Resolve-Path -LiteralPath $previewPython).ProviderPath
& $previewPython -m pip show mkdocs *> $null
if ($LASTEXITCODE -ne 0) {
    & $previewPython -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) { throw 'Could not install documentation dependencies.' }
}

if ($BindAddress -ne '127.0.0.1' -and $BindAddress -ne 'localhost' -and $BindAddress -ne '::1') {
    # Only allow the preview Python process and port from the local subnet.
    # Include Public because Windows may classify a home/office Wi-Fi as Public.
    $previewRuleName = "DeltaXDocs-Preview-TCP-$Port"
    $previewRule = Get-NetFirewallRule -Name $previewRuleName -ErrorAction SilentlyContinue
    $previewRuleReady = $false
    if ($previewRule -and $previewRule.Enabled -eq 'True' -and $previewRule.Action -eq 'Allow' -and $previewRule.Direction -eq 'Inbound') {
        $previewApp = $previewRule | Get-NetFirewallApplicationFilter
        $previewPortFilter = $previewRule | Get-NetFirewallPortFilter
        $previewAddressFilter = $previewRule | Get-NetFirewallAddressFilter
        $previewRuleReady = ($previewApp.Program -eq $previewPython -and
            $previewPortFilter.LocalPort -eq "$Port" -and $previewPortFilter.Protocol -eq 'TCP' -and
            ($previewAddressFilter.RemoteAddress -join ',') -eq 'LocalSubnet' -and
            $previewRule.Profile -eq 'Any')
    }
    if (-not $previewRuleReady) {
        $previewPythonLiteral = $previewPython.Replace("'", "''")
        $previewFirewallScript = @"
`$ErrorActionPreference = 'Stop'
try {
    if (Get-NetFirewallRule -Name '$previewRuleName' -ErrorAction SilentlyContinue) {
        Remove-NetFirewallRule -Name '$previewRuleName'
    }
    New-NetFirewallRule -Name '$previewRuleName' -DisplayName 'DeltaX Docs preview (TCP $Port, LAN only)' -Direction Inbound -Action Allow -Enabled True -Profile Any -Protocol TCP -LocalPort $Port -RemoteAddress LocalSubnet -Program '$previewPythonLiteral' | Out-Null
    exit 0
} catch { exit 1 }
"@
        $previewEncodedScript = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($previewFirewallScript))
        Write-Host 'Setting up LAN access. Windows may ask for administrator permission to add the firewall rule.'
        try {
            $previewFirewallProcess = Start-Process -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" -Verb RunAs -WindowStyle Hidden -ArgumentList @('-NoProfile', '-NonInteractive', '-EncodedCommand', $previewEncodedScript) -Wait -PassThru
            if ($previewFirewallProcess.ExitCode -ne 0) { throw 'The firewall rule could not be configured.' }
        } catch {
            Write-Warning "LAN firewall setup failed or was cancelled. Local preview will still start, but other devices may be blocked. Run this script again and allow the firewall setup. $($_.Exception.Message)"
        }
    }
}

Write-Host "`nLocal preview: http://localhost:$Port" -ForegroundColor Cyan
if ($BindAddress -eq '0.0.0.0') {
    $previewLanAddresses = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -and $_.NetAdapter.Status -eq 'Up' } | ForEach-Object { $_.IPv4Address.IPAddress } | Select-Object -Unique
    foreach ($previewLanAddress in $previewLanAddresses) {
        Write-Host "LAN preview:   http://${previewLanAddress}:$Port" -ForegroundColor Green
    }
} elseif ($BindAddress -ne '127.0.0.1' -and $BindAddress -ne 'localhost' -and $BindAddress -ne '::1') {
    Write-Host "LAN preview:   http://${BindAddress}:$Port" -ForegroundColor Green
}
Write-Host "Keep this window open. Press Ctrl+C to stop.`n"
& $previewPython -m mkdocs serve --dev-addr "${BindAddress}:$Port" --watch theme --watch hooks
