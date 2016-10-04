const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
  if (req.method === 'OPTIONS')
    res.send(200)
  else
    next()
})

const last = (list) => list[list.length - 1]

// I call this database ... "memdb"
const db = {}

db.friends = [
  { id: 'rpflo',
    firstName: 'Ryan',
    lastName: 'Florence'
  },
  { id: 'mj',
    firstName: 'Michael',
    lastName: 'Jackson'
  }
]

db.books = [
  { id: 'abcde',
    ISBN: '0806968303',
    thumbnail: 'https://covers.openlibrary.org/b/id/7127905-M.jpg'
  },
  { id: 'fghij',
    ISBN: '1615192727',
    thumbnail: 'https://covers.openlibrary.org/b/id/6452994-M.jpg'
  }
]

db.lendings = [
  { friendId: 'mj', bookId: 'fghij' }
]

app.get('/', (req, res) => {
  const markup = `
  <pre>
    GET /friends
    GET /books

    POST /friends { firstName, lastName, id }
    POST /books { ISBN, id }

    POST /lend { friendId, bookId }
    POST /return { bookId }

    DELETE /friends/:id
    DELETE /books/:id
  </pre>
  `
  res.send(markup)
})

const shallowCopyList = (list) =>
  list.map(item => Object.assign({}, item))

app.get('/friends', (req, res) => {
  const friends = shallowCopyList(db.friends)
  friends.forEach(friend => {
    friend.lentBooks = []
    // nested loop! what's up WHITEBOARD INTERVIEWERS?!
    db.lendings.forEach(lending => {
      if (lending.friendId === friend.id) {
        friend.lentBooks.push(lending.bookId)
      }
    })
  })
  res.json(friends)
})

app.post('/friends', (req, res) => {
  db.friends.push(req.body)
  res.json(last(db.friends))
})

app.delete('/friends/:id', (req, res) => {
  db.friends = db.friends.filter(friend => (
    friend.id !== req.params.id
  ))
  db.lendings = db.lendings.filter(lending => (
    lending.friendId !== req.params.id
  ))
  res.json('ok')
})

app.get('/books', (req, res) => {
  res.json(db.books)
})

app.post('/books', (req, res) => {
  db.books.push(req.body)
  res.json(last(db.books))
})

app.delete('/books/:id', (req, res) => {
  db.books = db.books.filter(book => (
    book.id !== req.params.id
  ))
  db.lendings = db.lendings.filter(lending => (
    lending.bookId !== req.params.id
  ))
  res.json('ok')
})

app.post('/lend', (req, res) => {
  db.lendings.push(req.body)
  res.json(last(db.lendings))
})

app.post('/return/:bookId', (req, res) => {
  const beforeCount = db.lendings.length
  db.lendings = db.lendings.filter(lending => (
    req.params.bookId !== lending.bookId
  ))
  const deletedSomething = beforeCount > db.lendings.length
  res.status(deletedSomething ? 200 : 404).json(deletedSomething ? 'ok' : 'No lending found to delete.')
})

app.listen(3000)
