var xhr = require('../lib/xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var APIUtils = {
  loadContacts: function () {
    xhr.getJSON(`${API}/contacts`, function (err, res) {
      ServerActionCreators.loadedContacts(res.contacts);
    });
  }
};

module.exports = APIUtils;
