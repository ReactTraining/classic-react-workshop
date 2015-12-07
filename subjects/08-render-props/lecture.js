import React from 'react'
import { render } from 'react-dom'
import * as styles from './lib/styles'
import searchGithubRepos from './lib/searchGithubRepos'
import ScrollBottomNotifier from './lib/ScrollBottomNotifier'

////////////////////////////////////////////////////////////////////////////////
// Here's a fun app, check out ScrollBottomNotifier, making these kinds of tasks
// declarative is fantastic and makes code reuse really straightforward.

const App = React.createClass({
  getInitialState() {
    return {
      repos: [],
      links: {},
      fetching: false
    }
  },

  fetch(url) {
    const defaultUrl = 'https://api.github.com/search/repositories?q=react&sort=stars'
    this.setState({ fetching: true })
    searchGithubRepos(url || defaultUrl, (err, repos, links) => {
      this.setState({
        repos: this.state.repos.concat(repos),
        links,
        fetching: false
      })
    })
  },

  componentDidMount() {
    this.fetch()
  },

  fetchNextPage() {
    this.fetch(this.state.links.next)
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
// App to GithubSearch.

//const GithubSearch = React.createClass({
  //getInitialState() {
    //return {
      //repos: [],
      //links: {},
      //fetching: false
    //}
  //},

  //fetch(url) {
    //this.setState({ fetching: true })
    //searchGithubRepos(this.props.url || defaultUrl, (err, repos, links) => {
      //this.setState({
        //repos: this.state.repos.concat(repos),
        //links,
        //fetching: false
      //})
    //})
  //},

  //componentDidMount() {
    //this.fetch()
  //},

  //fetchNextPage() {
    //this.fetch(this.state.links.next)
  //},

  //render() {
    //return <pre>{JSON.stringify(this.state, null, 2)}</pre>
  //}
//})

//const App = React.createClass({
  //render() {
    //const url = 'https://api.github.com/search/repositories?q=react&sort=stars'
    //const canFetch = !this.state.fetching && this.state.links.next
    //return (
      //<div>
        //<GithubSearch url={url}/>

        //<ScrollBottomNotifier
          //style={styles.repos}
          //onScrollBottom={canFetch ? this.fetchNextPage : null}
        //>
          //<ul style={styles.repoList}>
            //{this.state.repos.map(repo => (
              //<li key={repo.id}>
                //<a href={repo.html_url} style={styles.repo}>
                  //<h3>{repo.full_name}</h3>
                  //<p>{repo.description}</p>
                //</a>
              //</li>
            //))}
          //</ul>
        //</ScrollBottomNotifier>
      //</div>
    //)
  //}
//})

//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// So now we've got the thing kinda working, but not rendering, to get data from
// inside of GithubSearch, back out to App? How do we ever get data from inside
// a component to another? We send a callback, turns out we use that callback
// for rendering too

//const GithubSearch = React.createClass({
  //getInitialState() {
    //return {
      //repos: [],
      //links: {},
      //fetching: false
    //}
  //},

  //fetch(url) {
    //this.setState({ fetching: true })
    //searchGithubRepos(this.props.url, (err, repos, links) => {
      //this.setState({
        //repos: this.state.repos.concat(repos),
        //links,
        //fetching: false
      //})
    //})
  //},

  //componentDidMount() {
    //this.fetch()
  //},

  //componentDidUpdate(prevProps) {
    //if (prevProps.url !== this.props.url)
      //this.fetch()
  //},

  //render() {
    //return this.props.children(this.state)
  //}
//})

//const App = React.createClass({
  //getInitialState() {
    //return {
      //url: 'https://api.github.com/search/repositories?q=react&sort=stars'
    //}
  //},

  //fetchNextPage(search) {
    //if (!search.fetching && search.links.next)
      //this.setState({ url: search.links.next})
  //},

  //render() {
    //return (
      //<div>
        //<GithubSearch url={this.state.url}>
          //{(search) => (
            //<ScrollBottomNotifier
              //style={styles.repos}
              //onScrollBottom={() => this.fetchNextPage(search)}
            //>
              //<ul style={styles.repoList}>
                //{search.repos.map(repo => (
                  //<li key={repo.id}>
                    //<a href={repo.html_url} style={styles.repo}>
                      //<h3>{repo.full_name}</h3>
                      //<p>{repo.description}</p>
                    //</a>
                  //</li>
                //))}
              //</ul>
            //</ScrollBottomNotifier>
          //)}
        //</GithubSearch>
      //</div>
    //)
  //}
//})

//render(<App/>, document.getElementById('app'))
