localStorage.token = localStorage.token || (Date.now()*Math.random());

function setToken(req) {
  req.setRequestHeader('authorization', localStorage.token);
}

export default function getJSON(url, cb) {
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

