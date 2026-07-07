import urllib.request

url = 'https://s33.maxcast.com.br:8192/live'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=15) as r:
    print('OK', r.status, r.geturl())
    print('Content-Type:', r.headers.get('Content-Type'))
