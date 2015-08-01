function handleData(data) {
  var pre = document.createElement('pre');
  var text = JSON.stringify(data);
  pre.appendChild(document.createTextNode(text));
  document.body.appendChild(pre);
}