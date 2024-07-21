GET /olympic-events/_stats

GET /olympic-events/_search

#
# EXERCISE 5
#

GET /_cluster/health

#
# EXERCISE 6
#

GET /olympic-events/_settings

# This is a way to put the cluster status in green
PUT /olympic-events/_settings
{
  "number_of_replicas": 0
}


#
# EXERCISE 7
#

GET /olympic-events/_mappings

// The mappings for the Age field is Keyword beacuse Elasticsearch finds NA values in the Age field, which are strings, and it can't convert them to numbers.

GET olympic-events/_search
{
  "_source": [
    "Age" // Return only the Age field
  ],
  "query": {
    "range": {
      "Age": {
        "gte": 0
      }
    }
  }
}

//Find the unique values of the Age field
GET olympic-events/_search
{
  "size": 0,
  "aggs": {
    "unique_age_values": {
      "terms": {
        "field": "Age",
        "size": 100
      }
    }
  }
}

#
# EXERCISE 8
#

POST _reindex
{
  "source": {
    "index": "olympic-events"
  },
  "dest": {
    "index": "olympic-events-backup"
  }
}


#
# EXERCISE 9
#

GET olympic-events/_search
{
  "size": 0,
  "query":{
    "multi_match":{
      "fields": ["Age", "Weight", "Height"],
      "query": "NA"
    }
  },
  "aggs": {
    "NA_fileds_count": {
      "value_count": {
        "field": "Age"
      }
    }
  }
}

POST olympic-events/_delete_by_query
{
  "query":{
    "multi_match":{
      "fields": ["Age", "Weight", "Height"],
      "query": "NA"
    }
  }
}

#
# EXERCISE 10
#

GET olympic-events/_search

GET /olympic-events/_search
{
  "_source": [
    "Games"
  ]
}

PUT _ingest/pipeline/split_games
{
  "description": "This ingest pipeline will split year and season in separated fields",
  "processors": [
    {
      "grok": {
        "field": "Games",
        "patterns": ["%{NUMBER:year} %{GREEDYDATA:season}"]
      }
    },
    {
      "remove": {
        "field": "Games"
      }
    }
  ]
}

#
# Exercise 11
#
POST _ingest/pipeline/split_games/_simulate
{
  "docs": [
    {
      "_source": {
        "Games": "1998 Summer"
      }
    },
    {
      "_source": {
        "Games": "2014 Winter"
      }
    }
  ]
}


#
# Exercise 12
#
PUT olympic-events-fixed
{
  "mappings": {
    "properties": {
      "atleteId": {
        "type": "integer"
      },
      "short": {
        "type": "short"
      },
      "height": {
        "type": "short"
      },
      "weight": {
        "type": "short"
      },
      "athleteName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "genre": {
        "type": "keyword"
      },
      "team": {
        "type": "keyword"
      },
      "noc": {
        "type": "keyword"
      },
      "year": {
        "type": "short"
      },
      "season": {
        "type": "keyword"
      },
      "city": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "sport": {
        "type": "keyword"
      },
      "event": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "meda": {
        "type": "keyword"
      }
    }
  }
}