// Text: Analyzed searchs, Analyzers can be applied
// Keyword: Exact match

POST /test_employee/_doc
{
  "email": "jhon@gmail.com",
  "status_code": "200-A",
  "description": "This is a test",
  "name": "Jhon Doe",
  "role": "admin",
  "age": 30
}

PUT /test_employee
{
  "mappings": {
    "properties": {
      "email": {
        "type": "keyword"
      },
      "status_code": {
        "type": "keyword"
      },
      "description": {
        "type": "text"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        } 
      },
      "role": {
        "type": "keyword"
      },
      "age": {
        "type": "integer"
      }
    }
  }
}

GET test_employee/_mapping

// Arrays

POST /test_books/_doc
{
  "name": "Book",
  "price": {
    "COP": 10000,
    "USD": 10
  },
  "authors": [
    {
      "name" : "Jhon Doe",
      "age": 30,
      "books": ["Book 1", "Book 2"],
      "nationality": "USA"
    }, 
    {
      "name" : "Jane Doe",
      "age": 25,
      "books": ["Book 3", "Book 4"],
      "nationality": "Colombia"
    }
  ]
}

// Defatul object mapping plains the values of the object lossing the relations between the fields, for this case we need to use nested objects

// rank_feature
PUT test_rank_feature
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "likes": {
         "type": "long",
         "fields":{
            "rank": {
              "type": "rank_feature"
            }
         }
      }, 
      "dislikes": {
         "type": "long",
         "fields":{
            "rank": {
              "type": "rank_feature"
            }
         }
      }
    }
  }
} // This is a feature that allows to rank the documents based on the likes and dislikes