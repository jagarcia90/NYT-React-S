var axios = require('axios');

var APIKey = 'e04aa70ac0014130a1ce7a19a2e5a985';

var helpers = {

  runQuery: function(term, start, end)  {

    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
          'api-key': APIKey,
          'q': term,
          'begin_date': start,
          'end_date': end
      }
    })

    .then(function(results){

      return results.data.response;

    });
  },

  getSaved: function(){

    return axios.get('/api/saved')
      .then(function(results){

        return results;
      })
  },

  postSaved: function(title, date, url){

    var newArticle = {title: title, date: date, url: url};
    return axios.post('/api/saved', newArticle)
      .then(function(results){
        return results._id;
      })

  },

  deleteSaved: function(title, data, url){

    return axios.delete('/api/saved', {
      params: {
          'title': title,
          'data': data,
          'url': url,
      }
    })
    .then(function(results){
      return results;
    })
  }

}

module.exports = helpers;
