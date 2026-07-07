import re
import urllib.request

url = 'https://tunein.com/search/?query=Itajub%C3%A1'
html = urllib.request.urlopen(url, timeout=20).read().decode('utf-8', errors='ignore')
for m in re.finditer(r'<a[^>]+href="(/radio/[^"<>]+)"[^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL):
    href = m.group(1)
    inner = m.group(2)
    title = re.sub(r'<[^>]+>', ' ', inner)
    title = re.sub(r'\s+', ' ', title).strip()
    if 'Panorama' in title or 'Panorama FM' in title or 'Panorama Fm' in title:
        print(href, '=>', title)
