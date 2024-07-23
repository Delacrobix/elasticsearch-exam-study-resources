#
# Exercise 19
#

GET olympic-events-fixed/_search
{
  "size": 0,
  "query": {
    "match": {
      "event": "Gymnastics"
    }
  },
  "aggs": {
    "events": {
      "terms": {
        "field": "event.keyword",
        "size": 100
      }
    }
  }
}

#
# Exercise 20
#

GET olympic-events-fixed/_search
{
  "size": 0,
  "aggs": {
    "avg-weight-male": {
      "filter": {
        "term": {
          "gender": "M"
        }
      },
      "aggs": {
        "avg": {
          "avg": {
            "field": "weight"
          }
        }
      }
    },
    "avg-weight-female":{
      "filter": {
        "term": {
          "gender": "F"
        }
      },
      "aggs": {
        "avg": {
          "avg": {
            "field": "weight"
          }
        }
      }
    }
  }
}


#
# Exercise 21
#

GET olympic-events-fixed

GET olympic-events-fixed/_search
{
  "size": 0,
  "aggs": {
    "first_events": {
      "terms": {
        "field": "event.keyword",
        "size": 590,
        "order": {
          "year_of_appear": "asc"
        }
      },
      "aggs": {
        "year_of_appear": {
          "min": {
            "field": "year"
          }
        },
        "sorting": {
          "bucket_sort": {
            "sort": [
              {
                "year_of_appear": {
                  "order": "asc"
                }
              }
            ]
          }
        }
      }
    },
    "recent_events":{
      "terms": {
        "field": "event.keyword",
        "order": {
          "year_of_appear": "desc"
        }, 
        "size": 10
      },
      "aggs": {
        "year_of_appear": {
          "min": {
            "field": "year"
          }
        },
        "sorting": {
          "bucket_sort": {
            "sort": [
              {
                "year_of_appear": {
                  "order":  "desc"
                }
              }  
            ]
          }
        }
      }
    }
  }
}

#
# Exercise 22
#

GET olympic-events-fixed/_search
{
  "_source": [
    "athleteName",
    "team",
    "sport",
    "age",
    "height",
    "weight",
    "gender"
  ],
  "size": 50,
  "sort": [
    {
      "height": {
        "order": "desc"
      }
    }
  ],
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "year": "2016"
          }
        }
      ]
    }
  }
}

#
# Exercise 23
#

GET olympic-events-fixed/_search
{
  "script_fields": {
    "weightLbs": {
      "script": {
        "source": "doc['weight'].value * 2.2"
      }
    }
  }, 
  "_source": [
    "athleteName",
    "team",
    "sport",
    "age",
    "height",
    "weight",
    "gender"
  ],
  "size": 50,
  "sort": [
    {
      "height": {
        "order": "desc"
      }
    }
  ],
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "year": "2016"
          }
        }
      ]
    }
  }
}

#
# Exercise 24
#

GET olympic-events-fixed/_search
{
  "script_fields": {
    "bmi": {
      "script": {
        "lang": "painless", 
        "source": "doc['weight'].value/Math.pow(doc['height'].value/100, 2)"
      }
    }
  }, 
  "_source": [
    "athleteName",
    "team",
    "sport",
    "age",
    "height",
    "weight",
    "gender"
  ],
  "size": 50,
  "sort": [
    {
      "height": {
        "order": "desc"
      }
    }
  ],
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "year": "2016"
          }
        }
      ]
    }
  }
}