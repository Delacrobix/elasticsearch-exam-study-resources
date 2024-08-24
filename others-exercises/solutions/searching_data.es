/**
*
* EXERSICE 1
*
**/


PUT search_example_index
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "content": {
        "type": "text"
      },
      "author": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      },
      "published_date": {
        "type": "date"
      }
    }
  }
}

POST /search_example_index/_doc/1
{
  "title": "Introduction to Elasticsearch",
  "content": "Elasticsearch is a distributed, RESTful search and analytics engine.",
  "author": "Alice",
  "tags": ["elasticsearch", "search"],
  "published_date": "2024-08-01"
}

POST /search_example_index/_doc/2
{
  "title": "Advanced Elasticsearch Queries",
  "content": "Learn about advanced querying techniques in Elasticsearch.",
  "author": "Bob",
  "tags": ["elasticsearch", "queries"],
  "published_date": "2024-08-05"
}

POST /search_example_index/_doc/3
{
  "title": "Mastering Kibana",
  "content": "Kibana is the visualization layer that works with Elasticsearch.",
  "author": "Charlie",
  "tags": ["kibana", "visualization"],
  "published_date": "2024-08-10"
}


GET search_example_index/_search
{
  "query": {
    "match": {
      "content": "Elasticsearch"
    }
  }
}

GET search_example_index/_search
{
  "query": {
    "match_phrase": {
      "title": "Advanced Elasticsearch Queries"
    }
  }
}

GET search_example_index/_search
{
  "query": {
    "multi_match": {
      "query": "visualization",
      "fields": ["content", "tags"]
    }
  }
}

/**
*
* EXERSICE 2
*
**/

PUT test_runtime
{
  "mappings": {
    "dynamic": "runtime",
    "runtime": {
      "total_value": {
        "type": "double",
        "script": {
          "source": "emit(doc['price'].value * doc['quantity'].value)"
        }
      }
    },
    "properties": {
      "price": {
        "type": "double"
      },
      "quantity": {
        "type": "integer"
      }
    }
  }
}

POST /test_runtime/_bulk
{"index":{}}
{"price":10,"quantity":2}
{"index":{}}
{"price":15.5,"quantity":4}
{"index":{}}
{"price":7,"quantity":10}

GET test_runtime/_search
{
  "fields": [
    "total_value"
  ],
  "_source": false
}

/**
*
* EXERSICE 3
*
**/

// Into es-west cluster:

PUT _cluster/settings
{
  "persistent": {
    "cluster": {
      "remote": {
        "es-east": {
          "seeds": [
            "es-east:9300"
          ]
        }
      }
    }
  }
}

GET _remote/info

// Into es-east cluster:

PUT remote_index
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "description": {
        "type": "text"
      },
      "category": {
        "type": "keyword"
      }
    }
  }
}

POST remote_index/_bulk
{ "index": {} }
{ "title": "Remote Product 1", "description": "Description for remote product 1", "category": "electronics" }
{ "index": {} }
{ "title": "Remote Product 2", "description": "Description for remote product 2", "category": "clothing" }
{ "index": {} }
{ "title": "Remote Product 3", "description": "Description for remote product 3", "category": "books" }

// Into es-west cluster:

GET es-east:remote_index/_search