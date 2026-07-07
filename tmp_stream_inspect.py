import re
import urllib.request

url = 'https://www.radiopanoramafm.com/'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
})
html = urllib.request.urlopen(req, timeout=20).read().decode('utf-8', errors='ignore')
print('LENGTH', len(html))
patterns = ['src=', 'iframe', 'audio', 'm3u8', 'm3u', 'mp3', 'stream', 'radio', 'player', 'playlist']
for p in patterns:
    print('\n--- PATTERN:', p)
    count = 0
    for line in html.splitlines():
        if p in line.lower():
            print(line.strip())
            count += 1
            if count >= 20:
                break
