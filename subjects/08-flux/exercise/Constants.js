import keyMirror from 'key-mirror'

export default {

  API: 'http://addressbook-api.herokuapp.com',

  ActionTypes: keyMirror({
    CONTACTS_LOADED: null,
    LOAD_CONTACTS: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

}
