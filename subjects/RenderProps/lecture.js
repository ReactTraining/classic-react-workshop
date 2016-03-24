import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import * as styles from './utils/styles'
import searchGitHubRepos from './utils/searchGitHubRepos'
import ScrollBottomNotifier from './utils/ScrollBottomNotifier'

const DefaultFetchURL = 'https://api.github.com/search/repositories?q=react&sort=stars'

////////////////////////////////////////////////////////////////////////////////
// Here's a fun app, check out ScrollBottomNotifier, making these kinds of tasks
// declarative is fantastic and makes code reuse really straightforward.

const App = React.createClass({
  getInitialState() {
    return {
      fetching: false,
      repos: [],
      links: {}
    }
  },

  componentDidMount() {
    this.fetch(DefaultFetchURL)
  },

  fetchNextPage() {
    this.fetch(this.state.links.next)
  },

  fetch(url) {
    this.setState({ fetching: true })

    searchGitHubRepos(url, (err, repos, links) => {
      this.setState({
        fetching: false,
        repos: this.state.repos.concat(repos),
        links
      })
    })
  },

  render() {
    const canFetch = !this.state.fetching && this.state.links.next

    return (
      <ScrollBottomNotifier
        style={styles.repos}
        onScrollBottom={canFetch ? this.fetchNextPage : null}
      >
        <ul style={styles.repoList}>
          {this.state.repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} style={styles.repo}>
                <h3>{repo.full_name}</h3>
                <p>{repo.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </ScrollBottomNotifier>
    )
  }
})

render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Making something like Scrolling a component makes a lot of sense, but what
// of all that github search stuff? Could we make that declarative?
//
// First we'll just create a new component and move a bunch of stuff from
// <App> to <GitHubSearch>.

//const GitHubSearch = React.createClass({
//  propTypes: {
//    url: PropTypes.string.isRequired
//  },
//
//  getInitialState() {
//    return {
//      fetching: false,
//      repos: [],
//      links: {}
//    }
//  },
//
//  componentDidMount() {
//    this.fetch()
//  },
//
//  fetch() {
//    this.setState({ fetching: true })
//
//    searchGitHubRepos(this.props.url, (err, repos, links) => {
//      this.setState({
//        fetching: false,
//        repos: this.state.repos.concat(repos),
//        links
//      })
//    })
//  },
//
//  render() {
//    return <pre>{JSON.stringify(this.state, null, 2)}</pre>
//  }
//})
//
//const App = React.createClass({
//  render() {
//    return (
//      <GitHubSearch url={DefaultFetchURL}/>
//    )
//  }
//})
//
//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// So now we've got the thing kinda working, but not rendering anything useful.
// How do we get data from inside of <GitHubSearch>, back out to <App>?
//
// Well, how do we ever get data from inside a component to another? We send a
// callback, turns out we can use that same technique for rendering too!

//const GitHubSearch = React.createClass({
//  propTypes: {
//    url: PropTypes.string.isRequired,
//    children: PropTypes.func.isRequired
//  },
//
//  getInitialState() {
//    return {
//      fetching: false,
//      repos: [],
//      links: {}
//    }
//  },
//
//  componentDidMount() {
//    this.fetch()
//  },
//
//  componentDidUpdate(prevProps) {
//    if (prevProps.url !== this.props.url)
//      this.fetch()
//  },
//
//  fetch() {
//    this.setState({ fetching: true })
//
//    searchGitHubRepos(this.props.url, (err, repos, links) => {
//      this.setState({
//        fetching: false,
//        repos: this.state.repos.concat(repos),
//        links
//      })
//    })
//  },
//
//  render() {
//    return this.props.children(this.state)
//  }
//})
//
//const App = React.createClass({
//  getInitialState() {
//    return {
//      fetchURL: DefaultFetchURL
//    }
//  },
//
//  fetchNextPage(search) {
//    if (!search.fetching && search.links.next)
//      this.setState({ fetchURL: search.links.next })
//  },
//
//  render() {
//    return (
//      <div>
//        <GitHubSearch url={this.state.fetchURL}>
//          {search => (
//            <ScrollBottomNotifier
//              style={styles.repos}
//              onScrollBottom={() => this.fetchNextPage(search)}
//            >
//              <ul style={styles.repoList}>
//                {search.repos.map(repo => (
//                  <li key={repo.id}>
//                    <a href={repo.html_url} style={styles.repo}>
//                      <h3>{repo.full_name}</h3>
//                      <p>{repo.description}</p>
//                    </a>
//                  </li>
//                ))}
//              </ul>
//            </ScrollBottomNotifier>
//          )}
//        </GitHubSearch>
//      </div>
//    )
//  }
//})
//
//render(<App/>, document.getElementById('app'))
