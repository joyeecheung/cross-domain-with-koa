// The iframe and the page should be each of
// the two domains
var subdomain = 'baz.foo.com';
var basedomain = 'foo.com';

var currentDomain = window.location.host;
var anotherDomain;

if (currentDomain === subdomain) {
  anotherDomain = basedomain;
} else {
  anotherDomain = subdomain;
}

// create a hidden iframe
var iframe = document.createElement('iframe');
iframe.src = 'http://' + anotherDomain + '/demo/iframe';
iframe.style.width = 0;
iframe.style.height = 0;
document.body.appendChild(iframe);

iframe.onload = function() {
  // this is needed to make the internal port null
  document.domain = basedomain;

  // show the two domains
  document.getElementById('current-domain').textContent = currentDomain;
  document.getElementById('another-domain').textContent = anotherDomain

  var DONE = 4;  // XHR DONE readystate code

  function handleResponse(dataId, urlId, xhr) {
    var pre = document.getElementById(dataId);
    var response = xhr.responseText;
    var body = JSON.stringify(JSON.parse(response), null, 4);
    pre.textContent = body;
    var url = document.getElementById(urlId);
    url.textContent = xhr.responseURL;
  }

  // GET demo
  var getButton = document.getElementById('get-domain-button');
  getButton.addEventListener('click', function() {
    var id = document.getElementById('get-domain-id').value;
    var url = 'http://' + anotherDomain + '/api/normal/' + id;
    var xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === DONE) {
        handleResponse('get-domain-data', 'get-domain-url', xhr)
      }
    };
    xhr.send();
  });

  // POST demo
  var postButton = document.getElementById('post-domain-button');
  postButton.addEventListener('click', function() {
    var id = document.getElementById('post-domain-id').value;
    var url = 'http://' + anotherDomain + '/api/normal/';
    var xhr = new iframe.contentWindow.XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === DONE) {
        handleResponse('post-domain-data', 'post-domain-url', xhr)
      }
    };

    xhr.send(JSON.stringify({ id: id }));
  });
};
