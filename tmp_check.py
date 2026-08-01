import urllib.request, re
url='https://www.youtube.com/@alexandrerobbie/videos'
req=urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
html=urllib.request.urlopen(req, timeout=20).read().decode('utf-8', 'ignore')
print('len', len(html))
channelId=re.search(r'"channelId":"(UC[^"]{21})"', html)
externalId=re.search(r'"externalId":"(UC[^"]{21})"', html)
ids=re.findall(r'watch\\?v=([A-Za-z0-9_-]{11})', html)
print('channelId', channelId.group(1) if channelId else 'nao-encontrado')
print('externalId', externalId.group(1) if externalId else 'nao-encontrado')
print('firstIds', ids[:12])
