/**
*
* EXERSICE 1
*
**/

PUT test_pagination
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

POST /test_pagination/_bulk
{"index":{}}
{"title":"Product 1","description":"Description for product 1","category":"electronics"}
{"index":{}}
{"title":"Product 2","description":"Description for product 2","category":"electronics"}
{"index":{}}
{"title":"Product 3","description":"Description for product 3","category":"clothing"}
{"index":{}}
{"title":"Product 4","description":"Description for product 4","category":"clothing"}
{"index":{}}
{"title":"Product 5","description":"Description for product 5","category":"books"}
{"index":{}}
{"title":"Product 6","description":"Description for product 6","category":"books"}
{"index":{}}
{"title":"Product 7","description":"Description for product 7","category":"electronics"}
{"index":{}}
{"title":"Product 8","description":"Description for product 8","category":"clothing"}
{"index":{}}
{"title":"Product 9","description":"Description for product 9","category":"books"}
{"index":{}}
{"title":"Product 10","description":"Description for product 10","category":"clothing"}


GET test_pagination/_search
{
  "size": 3,
  "from": 0,
  "query": {
    "term": {
      "category": "electronics"
    }
  }
}

GET test_pagination/_search
{
  "size": 3,
  "from": 3,
  "query": {
    "term": {
      "category": "electronics"
    }
  }
}