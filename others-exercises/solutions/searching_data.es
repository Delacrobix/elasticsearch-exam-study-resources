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