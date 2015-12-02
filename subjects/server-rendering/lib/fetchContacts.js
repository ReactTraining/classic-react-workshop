var axios = require('axios');

function fetchContacts(cb) {
  axios.get('https://addressbook-api.herokuapp.com/contacts').then((res) => {
    cb(res.data.contacts);
  });
}

module.exports = fetchContacts;

