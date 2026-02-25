import urllib.request
import json
import urllib.error

data = json.dumps({'email': 'arunj56872@gmail.com', 'password': 'mypassword', 'full_name': 'Test User'}).encode('utf-8')
req = urllib.request.Request('http://localhost:8000/api/v1/auth/register', data=data, headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req)
    print("Success:", response.read().decode())
except urllib.error.HTTPError as e:
    print("Error:", e.code)
    print(e.read().decode())
