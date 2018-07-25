localStorage.token = localStorage.token || Date.now() * Math.random();

function setToken(req) {
  req.setRequestHeader("authorization", localStorage.token);
}

export function getJSON(url, callback) {
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (req.status === 404) {
      callback(new Error("not found"));
    } else {
      callback(null, JSON.parse(req.response));
    }
  };
  req.open("GET", url);
  setToken(req);
  req.send();
}

export function postJSON(url, obj, callback) {
  const req = new XMLHttpRequest();
  req.onload = function() {
    callback(JSON.parse(req.response));
  };
  req.open("POST", url);
  req.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  setToken(req);
  req.send(JSON.stringify(obj));
}

export function deleteJSON(url, callback) {
  const req = new XMLHttpRequest();
  req.onload = function() {
    setTimeout(() => {
      if (req.status === 500) {
        callback(new Error(req.responseText));
      } else {
        callback(null, req.responseText);
      }
    }, Math.random() * 5000);
  };
  req.open("DELETE", url);
  setToken(req);
  req.send();
}
