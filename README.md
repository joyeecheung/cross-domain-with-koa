## Walkthrough

### Before you start

1. Edit your host file(on *nix system it's `/etc/hosts`, on Windows it's `C:\Windows\System32\drivers\etc\hosts`), make sure you have

  ```
  127.0.0.1 foo.com
  127.0.0.1 baz.foo.com
  127.0.0.1 bar.com
  ```
  in it.
2. Make sure the port 80 on your computer can be accessed.
3. Download/clone this repo, run

  ```
  npm install
  ```
4. run `npm start` and visit `http://foo.com`

### CORS

Visit `http://foo.com/demo/cors`, fill in some Id(or don't), and GET/POST your data. Open the network tab in your Dev Tools and you will see it uses CORS to GET/POST data from `http://foo.com/` to `http://bar.com/`.

If you check the `preflight` checkbox when you are POSTing data, you can see how the preflight CORS works. If you don't check it, you can see how it's done using simple CORS(without `application/json` as `Content-Type`).

### JSONP

Visit `http://foo.com/demo/jsonp`, fill in some Id(or don't), and GET your data from `http://bar.com`. Open your Dev Tools and you can see what the response looks like in the network tab, and what the request looks like in your DOM inspector(look for the `<script>` tag in the `<head>`).

### `document.domain`

Visit `http://foo.com/demo/domain`, fill in some Id(or don't), and GET/POST your data from/to `http://baz.foo.com`. Find the hidden `<iframe>`, check it's `contentDocument.domain`, and check the `document.domain` of the web page. Look into the source code of `domain.js` and `iframe.js` to see how it works.

Visit `http://baz.foo.com/demo/domain`, and repeat the steps above.

### `window.postMessage()`

Visit `http://foo.com/demo/message`, fill in some Id(or don't), and GET/POST your data from/to `http://bar.com`. Look into the source code of `message.js` and `message-iframe.js` to see how it works.
