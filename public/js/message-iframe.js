var DONE = 4;

window.addEventListener('message', function(e) {
  var message = e.data;
  var xhr = new XMLHttpRequest();
  xhr.open(message.method, message.url, true);
  if (message.headers) {
    for (var header in message.headers)
      xhr.setRequestHeader(header, message.headers[header]);
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === DONE) {
      e.source.postMessage({
        method: message.method,
        xhr: {
          responseText: xhr.responseText,
          responseURL: xhr.responseURL
        }
      }, e.origin);
    }
  }

  xhr.send(message.data);
});