import "isomorphic-fetch";

const fetchContacts = cb =>
  fetch("https://addressbook-api.herokuapp.com/contacts")
    .then(res => res.json())
    .then(data => {
      cb(null, data.contacts);
    }, cb);

export default fetchContacts;
