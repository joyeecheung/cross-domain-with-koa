var responseURL;

function handleData(data) {
  var pre = document.getElementById('get-jsonp-data');
  var text = JSON.stringify(data, null, 4);
  pre.textContent = text;
  var url = document.getElementById('get-jsonp-url');
  url.textContent = responseURL;
}

// GET demo
var getButton = document.getElementById('get-jsonp-button');
getButton.addEventListener('click', function() {
  var script = document.createElement("script");
  var id = document.getElementById('get-jsonp-id').value;
  script.src = "http://bar.com/api/jsonp/" + id + "?_cb=handleData"
  responseURL = script.src;
  document.head.appendChild(script);
});
