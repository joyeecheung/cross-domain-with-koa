var subdomain = 'baz.foo.com';
var basedomain = 'foo.com';

var currentDomain = window.location.host;
var anotherDomain;

if (currentDomain === subdomain) {
  anotherDomain = basedomain;
} else {
  anotherDomain = subdomain;
}

var iframe = document.createElement('iframe');
iframe.src = 'http://' + anotherDomain + '/demo/iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = function() {
  document.domain = basedomain;

  document.getElementById('current-domain').textContent = currentDomain;
  document.getElementById('another-domain').textContent = anotherDomain

  var DONE = 4;  // XHR DONE readystate code

  function handleResponse(id, xhr) {
    var pre = document.getElementById(id);
    var response = xhr.responseText;
    var body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = xhr.responseURL + '\n' + body;
  }

  var getButton = document.getElementById('get-domain-button');
  getButton.addEventListener('click', function() {
    var id = document.getElementById('get-domain-id').value;
    var url = 'http://' + anotherDomain + '/api/normal/' + id;
    var xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === DONE) {
        handleResponse('get-domain-data', xhr)
      }
    };
    xhr.send();
  });

  var postButton = document.getElementById('post-domain-button');

  postButton.addEventListener('click', function() {
    var id = document.getElementById('post-domain-id').value;
    var url = 'http://' + anotherDomain + '/api/normal/';
    var xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === DONE) {
        handleResponse('post-domain-data', xhr)
      }
    };

    xhr.send(JSON.stringify({ id: id }));
  });
};
