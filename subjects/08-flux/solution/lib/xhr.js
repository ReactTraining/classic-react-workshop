localStorage.token = localStorage.token || (Date.now()*Math.random());

function setToken(req) {
  req.setRequestHeader('authorization', localStorage.token);
}

function getJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  setToken(req);
  req.send();
}

function postJSON(url, obj, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    cb(JSON.parse(req.response));
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  setToken(req);
  req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 500)
      cb(new Error(req.responseText));
    else
      cb(null, req.responseText);
  };
  req.open('DELETE', url);
  setToken(req);
  req.send();
}

module.exports = {
  getJSON,
  postJSON,
  deleteJSON
};
