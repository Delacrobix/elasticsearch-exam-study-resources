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

/**
*
* EXERSICE 2
*
**/

PUT test_products
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "description": {
        "type": "text"
      },
      "category": {
        "type": "keyword"
      },
      "price": {
        "type": "double"
      }
    }
  }
}

POST /test_products/_bulk
{ "index": {} }
{ "name": "Laptop", "description": "A powerful laptop", "category": "electronics", "price": 1200.0 }
{ "index": {} }
{ "name": "Smartphone", "description": "A high-end smartphone", "category": "electronics", "price": 800.0 }
{ "index": {} }
{ "name": "Jeans", "description": "Comfortable jeans", "category": "clothing", "price": 50.0 }
{ "index": {} }
{ "name": "Sneakers", "description": "Stylish sneakers", "category": "clothing", "price": 120.0 }
{ "index": {} }
{ "name": "Book", "description": "A thrilling novel", "category": "books", "price": 15.0 }
{ "index": {} }
{ "name": "Tablet", "description": "A lightweight tablet", "category": "electronics", "price": 300.0 }

PUT _scripts/product_search_template
{
  "script": {
    "lang": "mustache",
    "source": {
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "category": {
                  "value": "{{category}}"
                }
              }
            },
            {
              "range": {
                "price": {
                  "gte": "{{min_price}}"
                }
              }
            }
          ]
        }
      }
    }
  }
}

// Validate the search template
POST _render/template
{
  "id": "product_search_template",
  "params": {
    "category": "electronics",
    "min_price": 500
  }
}

GET test_products/_search/template
{
  "id": "product_search_template",
  "params": {
    "category": "electronics",
    "min_price": 500
  }
}
