import axios from 'axios'

function fetchContacts(cb) {
  axios.get('https://addressbook-api.herokuapp.com/contacts').then((res) => {
    cb(res.data.contacts)
  })
}

export default fetchContacts
