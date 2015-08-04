// create a hidden iframe
var iframe = document.createElement('iframe');
iframe.src = 'http://bar.com/demo/message-iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = function() {
  function handleResponse(dataId, urlId, xhr) {
    var pre = document.getElementById(dataId);
    var response = xhr.responseText;
    var body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = body;
    var url = document.getElementById(urlId);
    url.textContent = xhr.responseURL;
  }

  // listen for messages posted from the iframe
  window.addEventListener('message', function(e) {
    var message = e.data;
    if (message.method === 'GET') {
      handleResponse('get-message-data', 'get-message-url', message.xhr);
    } else {
      handleResponse('post-message-data', 'post-message-url', message.xhr);
    }
  });

  // GET demo
  var getButton = document.getElementById('get-message-button');
  getButton.addEventListener('click', function() {
    var id = document.getElementById('get-message-id').value;
    iframe.contentWindow.postMessage({
      method: 'GET',
      url: 'http://bar.com/api/normal/' + id
    }, 'http://bar.com');
  });

  // POST demo
  var postButton = document.getElementById('post-message-button');
  postButton.addEventListener('click', function() {
    var id = document.getElementById('post-message-id').value;
    var url = 'http://bar.com/api/normal/';
    iframe.contentWindow.postMessage({
      method: 'POST',
      url: 'http://bar.com/api/normal/',
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      data: JSON.stringify({
        id: id
      })
    }, 'http://bar.com');
  });
};
