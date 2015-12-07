import jsonp from 'jsonp'

function parseLinks(meta) {
  return meta.Link.reduce((links, link) => {
    links[link[1].rel] = link[0]
    return links
  }, {})
}

function searchGithubRepos(url, callback) {
  jsonp(url, (err, res) => {
    callback(null, res.data.items, parseLinks(res.meta))
  })
}

export default searchGithubRepos
