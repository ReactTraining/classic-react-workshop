import jsonp from 'jsonp'

function parseLinks (meta) {
  return meta.Link.reduce((links, link) => {
    links[link[1].rel] = link[0]
    return links
  }, {})
}

export default function fetchGists (url, cb) {
  jsonp(url, (err, res) => {
    cb(null, res.data.items, parseLinks(res.meta));
  });
}

