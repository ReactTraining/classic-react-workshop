import axios from 'axios'

function fetchContacts(cb) {
  axios.get('https://addressbook-api.herokuapp.com/contacts').then((res) => {
    cb(null, res.data.contacts)
  }, cb)
}

export default fetchContacts
