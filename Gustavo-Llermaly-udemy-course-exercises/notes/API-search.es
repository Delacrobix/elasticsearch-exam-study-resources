GET /test_netflix/_search
{
  "size": 300, //documents to return
  "from": 40, //documents to skip
  "_source": {
      "includes": ["MAIN_GENRE", "TITLE"],
      "excludes": ["*"]
    } // fields to return
}

POST /test_match/_doc
{
  "name": "Harry Potter"
}
POST /test_match/_doc
{
  "name": "Star Wars"
}
POST /test_match/_doc
{
  "name": "Star Trek"
}

// Fuzziest search => support errors of typing
GET /test_match/_search
{
  "query": {
    "match": {
      "name": {
        "query": "hary",
        "fuzziness": "AUTO"
      }
    }
  }
}

// lenient => ignore mapping errors

// Operator => AND, OR
GET /test_match/_search
{
  "query": {
    "match": {
      "name": {
        "query": "star wars",
        "operator": "or" // with or the search will return all documents that contain either star or wars (this is the default mode)
      }
    }
  }
}

// match_phrase => search for a phrase

POST /test_match/_doc
{
  "name": "Strawberry fields forever"
}

GET /test_match/_search
{
  "query": {
    "match_phrase": {
      "name": {
        "query": "fields forever",
        "slop": 1 // how many words can be between the words of the phrase
      }
    }
  }
}

/**
 * * MULTI MATCH
 */
GET /test_netflix/_search
{
  "query": {
    "multi_match": {
      "query": "comedy",
      "fields": ["TITLE", "MAIN_GENRE"]
    }
  }
}

/**
 * * BOOL QUERIES
 */

// must => all conditions must be met
// should => at least one condition must be met
// filter => like must but does not affect the score
// must_not => all conditions must not be met
GET test_netflix/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "MAIN_GENRE": "documentary"
          }
        }
      ],
      "should": [ 
        //If a should clause matches, the score will be higher
        {
          "match": {
            "MAIN_PRODUCTION": "GB"
          }
        }
      ],
      "filter": [ 
        //Does not affect the score
        {
          "match": {
            "MAIN_PRODUCTION": "US"
          }
        }
      ]
    }
  }
}

GET test_netflix/_search
{
  "query": {
    "multi_match": {
      "query": "david",
      "fields": ["TITLE^10", "description"]
    }
  }
}

PUT test_ranking
{
  "mappings": {
    "properties": {
      "rating": {
        "type": "rank_feature"
      },
      "complaints": {
        "type": "rank_feature",
        "positive_score_impact": false // if the value is bigger, the score will be lower
      }
    }
  }
}

POST test_ranking/_doc
{
  "name": "Iphone X",
  "rating": 3,
  "complaints": 2
}

POST test_ranking/_doc
{
  "name": "Galaxy S20",
  "rating": 5,
  "complaints": 3
}

POST test_ranking/_doc
{
  "name": "Iphone SE",
  "rating": 5,
  "complaints": 4
}

GET test_ranking/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "iphone",
            "fields": ["name^100"]
          }
        }
      ],
      "should": [
        {
          "rank_feature": {
            "field": "rating"
          }
        },
        {
          "rank_feature": {
            "field": "complaints"
          }
        }
      ]
    }
  }
}

/**
  Sort and range
 */

GET test_netflix/_search
{
  "query": {
    "match": {
      "TITLE": "life"
    }
  },
  "sort": [
    {
      "_score": {
        "order": "desc"
      }
    },
    {
      "MAIN_PRODUCTION": {
        "order": "asc"
      }
    }
  ]
}

GET test_netflix/_search
{
  "query": {
    "range": {
      "NUMBER_OF_VOTES": {
        "gte": 2010,
        "lte": 19000
      }
    }
  }
}

POST test_dates/_doc
{
  "date": "2020-01-01"
}

GET test_dates/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "2020-01-01",
        "lte": "2020-01-31"
      }
    }
  }
}

// y = year M = month m = minute s = second h = hour w = week


/**
 * *AGGREGATIONS

1 Facets: 
[ ] Red(20)
[X] Blue(10)
[ ] Green(5)
 */

// This query will return the number of documents that have each genre
GET test_netflix/_search
{
  "size": 0,
  "aggs": {
    "titulos": {
      "terms": {
        "field": "MAIN_GENRE",
        "size": 10
      }
    }
  }
}

//This query will return the number movies that were released in each decade
GET test_netflix/_search
{
  "size": 0,
  "aggs": {
    "titulos": {
      "histogram": {
        "field": "RELEASE_YEAR",
        "interval": 10
      }
    }
  }
}

// stats will return => min, max, avg, sum, count
GET test_netflix/_search
{
  "size": 0,
  "aggs": {
    "titulos": {
      "stats": {
        "field": "DURATION"
      }
    }
  }
}

// aggs inside aggs
GET test_netflix/_search
{
  "size": 0,
  "aggs": {
    "titulos": {
      "terms": {
        "field": "MAIN_GENRE"
      },
      "aggs": {
        "duration": {
          "stats": {
            "field": "DURATION"
          }
        },
        "years": {
          "histogram": {
            "field": "RELEASE_YEAR",
            "interval": 10
          }
        }
      }
    }
  }
}

/**
 * * HIGHLIGHTING
 */
GET test_netflix/_search
{
  "query": {
    "match": {
      "TITLE": "Saving"
    }
  },
  "highlight": {
    "fields": {
      "TITLE": {
        "pre_tags": ["<strong>"],
        "post_tags": ["</strong>"]
      }
    }
  }
}