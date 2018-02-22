import jsonp from "jsonp";

const API =
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json";

export function search(term, cb) {
  jsonp(`${API}&search=${term}`, (err, data) => {
    if (err) {
      cb(err);
    } else {
      const [searchTerm, titles, descriptions, urls] = data;
      cb(
        null,
        titles.sort().map((title, index) => {
          return {
            title,
            description: descriptions[index],
            url: urls[index]
          };
        })
      );
    }
  });
}
