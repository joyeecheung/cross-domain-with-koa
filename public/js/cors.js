var DONE = 4;  // XHR DONE readystate code

function handleResponse(id, xhr) {
  var pre = document.getElementById(id);
  var response = xhr.responseText;
  var body = JSON.stringify(JSON.parse(response), null, 4);
  pre.textContent = body;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

var getButton = document.getElementById('get-cors-button');

getButton.addEventListener('click', function() {
  var id = document.getElementById('get-cors-id').value;
  var url = 'http://bar.com/api/cors/' + id;
  var xhr = createCORSRequest('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === DONE) {
      handleResponse('get-cors-data', xhr)
    }
  };
  xhr.send();
});

var postButton = document.getElementById('post-cors-button');

postButton.addEventListener('click', function() {
  var id = document.getElementById('post-cors-id').value;
  var url = 'http://bar.com/api/cors/';
  var xhr = createCORSRequest('POST', url);

  var preflight = document.getElementById('post-cors-preflight').checked;
  if (preflight) {
    // this line would make the request preflight
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  } else {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState === DONE) {
      handleResponse('post-cors-data', xhr)
    }
  };

  if (preflight) {
    xhr.send(JSON.stringify({ id: id }));
  } else {
    xhr.send('id=' + id);
  }
  
});