var iframe = document.createElement('iframe');
iframe.src = 'http://bar.com/demo/message-iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = function() {
  function handleResponse(id, xhr) {
    var pre = document.getElementById(id);
    var response = xhr.responseText;
    var body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = xhr.responseURL + '\n' + body;
  }

  window.addEventListener('message', function(e) {
    var message = e.data;
    if (message.method === 'GET') {
      handleResponse('get-message-data', message.xhr);
    } else {
      handleResponse('post-message-data', message.xhr);
    }
  });

  var getButton = document.getElementById('get-message-button');
  getButton.addEventListener('click', function() {
    var id = document.getElementById('get-message-id').value;
    iframe.contentWindow.postMessage({
      method: 'GET',
      url: 'http://bar.com/api/normal/' + id
    }, 'http://bar.com');
  });

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
