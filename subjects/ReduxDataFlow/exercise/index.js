// start w/ requests inside the components
// - not cached
// - makes the request each time
//
// move fetching/state up to app, pass down as prop

import React from 'react'
import { render } from 'react-dom'
import { Match, Link, BrowserRouter as Router } from 'react-router'
import './styles.css'

//const API = 'https://books-api.now.sh'
const API = 'http://localhost:3000'
const token = localStorage.booksToken || Math.random().toString()
localStorage.booksToken = token

const getFriends = () => {
  return fetch(`${API}/friends`, {
    headers: {
      'authorization': token
    }
  }).then(res => res.json())
}

const getBooks = () => {
  return fetch(`${API}/books`, {
    headers: {
      'Authorization': token
    }
  }).then(res => res.json())
}

const lendBook = ({ book, friend }) => {
  return fetch(`${API}/lend`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bookId: book.id,
      friendId: friend.id
    })
  }).then(res => res.json())
}

const returnBook = (book) => {
  return fetch(`${API}/return/${book.id}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}


class Friends extends React.Component {

  render() {
    const { friends } = this.props

    return (
      <div>
        {friends ? (
          <div>
            {friends.map(friend => (
              <Link
                key={friend.id}
                to={`/friends/${friend.id}`}
                className="friend-list-item"
                activeClassName="active"
              >
                <div className="friend-list-avatar">
                  <span
                    style={{ backgroundImage: `url(${friend.avatar})` }}
                    className="friend-list-avatar-image"
                  />
                  {friend.lentBooks.length > 0 && (
                    <span className="book-count">{friend.lentBooks.length}</span>
                  )}
                </div>
                <div className="friend-list-name">
                  <div className="friend-list-first-name">
                    {friend.firstName}
                  </div>
                  <div className="friend-list-last-name">
                    {friend.lastName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

const findBorrower = (book, friends) => (
  friends.find(friend => friend.id === book.lentTo)
)

class Books extends React.Component {
  render() {
    const { books, friends } = this.props

    return (
      <div className="book-list">
        {books ? (
          <div>
            {books.map(book => {
              const borrower = book.lentTo && findBorrower(book, friends)
              return (
                <Link
                  to={`/books/${book.id}`}
                  className="book-list-item"
                  activeClassName="active"
                  key={book.id}
                >
                  <div className="book-list-item-image-wrapper">
                    <img className="book-list-image" src={book.cover}/>
                    {borrower && (
                      <div
                        className="borrower-avatar"
                        style={{ backgroundImage: `url(${borrower.avatar})` }}
                      />
                    )}
                  </div>
                  <div className="book-list-item-info">
                    <div className="book-list-item-text">
                      {book.name}
                    </div>
                    {borrower && (
                      <div className="borrower-text">
                        Lent to {borrower.firstName} {borrower.lastName}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    )
  }
}

class Sidebar extends React.Component {
  render() {
    const { friends, books } = this.props

    return (
      <div className="sidebar">
        <div className="nav">
          <div role="nav" className="nav-links">
            <Link to="/friends" className="nav-link" activeClassName="active">Friends</Link>
            {' '}
            <Link to="/books" className="nav-link" activeClassName="active">Books</Link>
          </div>
        </div>

        <div className="sidebar-content">
          <Match pattern="/friends" render={(props) => (
            <Friends {...props} friends={friends}/>
          )}/>
          <Match pattern="/books" render={(props) => (
            <Books {...props} books={books} friends={friends}/>
          )}/>
        </div>
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Books!</h1>
        <p>Welcome to the book lending app!</p>
        <p>Add some friends, add some books.</p>
        <p>Then, keep track of who you've got your books lent to.</p>
      </div>
    )
  }
}

const available = (books) => books.filter(b => !b.lentTo)

const findFriendById = (id, friends) =>
  friends.find(friend => friend.id === id)

class Friend extends React.Component {
  static propTypes = {
    onLendBook: React.PropTypes.func.isRequired
  }

  state = {
    lastLentBookId: null
  }

  lendBook = (book) => {
    const { friends, params } = this.props
    const friend = findFriendById(params.id, friends)
    lendBook({ book, friend }).then(() => {
      this.setState({ lastLentBookId: book.id })
      this.props.onLendBook()
    })
  }

  componentWillReceiveProps(nextProps) {
    const newFriend = nextProps.params.id !== this.props.params.id
    if (newFriend) {
      this.setState({ lastLentBookId: null })
    }
  }

  render() {
    const { friends, books, params } = this.props
    const { lastLentBookId } = this.state
    const friend = friends && findFriendById(params.id, friends)
    const lentBooks = friend && books && friend.lentBooks.map(
      (id) => books.find(book => book.id === id)
    )
    const availableBooks = friend && books && available(books)
    return (
      friend ? (
        <div className="friend">
          <div className="friend-header">
            <div
              className="friend-avatar-image"
              style={{ backgroundImage: `url(${friend.avatar})` }}
            />
          </div>
          <div className="friend-books">
            {lentBooks && (
              <div className="lent-books">
                <BookPicker
                  books={books}
                  onSelect={this.lendBook}
                />
                {lentBooks && lentBooks.reverse().map(book => (
                  <LentBook
                    isNew={book.id === lastLentBookId}
                    key={book.id}
                    book={book}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>:(</h1>
          <h1>Friend not found</h1>
        </div>
      )
    )
  }
}

class LentBook extends React.Component {
  static propTypes = {
    isNew: React.PropTypes.bool
  }

  static defaultProps = {
    isNew: false
  }

  state = {
    didMount: false
  }

  componentDidMount() {
    if (this.props.isNew) {
      setTimeout(() => {
        this.setState({ didMount: true })
      })
    }
  }

  render() {
    const { isNew } = this.props
    const { didMount } = this.state
    const { book } = this.props

    const classNames = [ 'lent-book' ]

    if (isNew && !didMount)
      classNames.push('lent-book-new')

    return (
      <div className={classNames.join(' ')}>
        <img src={book.cover} height="200"/>
      </div>
    )
  }
}

import matchSorter from 'match-sorter'

class BookPicker extends React.Component {
  state = {
    search: null
  }

  handleInputChange = (e) => {
    this.setState({ search: e.target.value })
  }

  handleInputBlur = () => {
    if (this.state.search === '') {
      this.setState({ search: null })
    }
  }

  getMatch() {
    const { search } = this.state
    const { books } = this.props
    if (!books || !search) {
      return false
    } else {
      const filteredBooks = matchSorter(
        available(books),
        search,
        { keys: [ 'name', 'id' ] }
      )
      if (filteredBooks.length === 0) {
        return false
      } else {
        return filteredBooks[0]
      }
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const book = this.getMatch()
      if (book) {
        this.props.onSelect(book)
        this.setState({ search: null })
      } else {
        event.target.select()
      }
    }
  }

  render() {
    const { search } = this.state
    const book = this.getMatch()
    return (
      <div className="book-picker">
        <input
          className="book-picker-input"
          placeholder="Lend a book"
          value={search === null ? '' : search}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeyDown}
        />
        <div className="book-picker-result">
          {search === null ? (
            <p className="result-text">Type the name of a book to lend.</p>
          ) : book ? (
            <div className="result-image-wrapper">
              <img className="result-image" src={book.cover} />
            </div>
          ) : (
            <p className="result-text">No results</p>
          )}
        </div>
      </div>
    )
  }
}

class Main extends React.Component {
  static propTypes = {
    onLendBook: React.PropTypes.func.isRequired
  }

  render() {
    const { friends, books } = this.props
    return (
      <div className="main">
        <Match pattern="/" exactly component={Home}/>
        <Match pattern="/books" exactly component={Home}/>
        <Match pattern="/friends" exactly component={Home}/>
        <Match pattern="/friends/:id" render={(props) => (
          <Friend
            friends={friends}
            books={books}
            onLendBook={() => this.props.onLendBook()}
            {...props}
          />
        )}/>
        <Match pattern="/books/:id" render={(props) => (
          <Book
            friends={friends}
            books={books}
            onBookReturned={() => this.props.onBookReturned()}
            {...props}
          />
        )}/>
      </div>
    )
  }
}

class Book extends React.Component {
  static propTypes = {
    onBookReturned: React.PropTypes.func
  }

  returnBook = () => {
    const { params, books } = this.props
    const book = books.find(b => b.id === params.id)
    returnBook(book).then(() => {
      this.props.onBookReturned(book.id)
    })
  }

  render() {
    const { books, friends, params } = this.props
    const book = books && books.find(b => b.id === params.id)
    const borrower = book && friends && findBorrower(book, friends)
    return book ? (
      <div className="book">
        <img className="book-image" src={book.cover}/>
        <div className="book-info">
          <h2 className="book-name">{book.name}</h2>
          {borrower && (
            <div className="book-borrower">
              <div
                style={{ backgroundImage: `url(${borrower.avatar})` }}
                className="book-borrower-avatar"
              />
              <div>
                <div>Borrowed by {borrower.firstName} {borrower.lastName}</div>
                <button className="return-button" onClick={this.returnBook}>
                  {borrower.firstName} returned this
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    ) : null
  }
}

class App extends React.Component {
  state = {
    friends: null,
    books: null
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    getFriends().then(friends => this.setState({ friends }))
    getBooks().then(books => this.setState({ books }))
  }

  render() {
    const { friends, books } = this.state
    return (
      <div className="app">
        <Sidebar friends={friends} books={books} />
        <Main
          friends={friends}
          books={books}
          onLendBook={this.getData}
          onBookReturned={this.getData}
        />
      </div>
    )
  }
}

render((
  <Router basename="/ReduxDataFlow/exercise.html">
    <App/>
  </Router>
), document.getElementById('app'))
