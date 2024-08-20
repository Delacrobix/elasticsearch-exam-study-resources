/**
*
* EXERSICE 1
*
**/

PUT test_custom_analyzer
{
  "settings": {
    "analysis": {
      "analyzer": {
        "custom_text_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "stop",
            "porter_stem",
            "asciifolding"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "custom_text_analyzer"
      },
      "description": {
        "type": "text",
        "analyzer": "custom_text_analyzer"
      },
      "category": {
        "type": "keyword"
      }
    }
  }
}

POST /test_custom_analyzer/_bulk
{ "index": {} }
{ "title": "Fantastic Electronics", "description": "The latest in electronic gadgets and devices", "category": "electronics" }
{ "index": {} }
{ "title": "Books on Technology", "description": "A comprehensive guide to modern technology", "category": "books" }
{ "index": {} }
{ "title": "Stylish Clothing", "description": "Fashionable and comfortable clothing", "category": "clothing" }
{ "index": {} }
{ "title": "Advanced Programming Books", "description": "Deep dive into advanced programming concepts", "category": "books" }
{ "index": {} }
{ "title": "Home Appliances", "description": "The best appliances for your home", "category": "electronics" }
{ "index": {} }
{ "title": "Fitness Gear", "description": "Everything you need to stay fit and healthy", "category": "clothing" }


GET test_custom_analyzer/_search
{
  "query": {
    "match": {
      "description": {
        "analyzer": "custom_text_analyzer",
        "query": "technology"
      }
    }
  }
}

GET test_custom_analyzer/_search
{
  "query": {
    "match": {
      "description": {
        "analyzer": "custom_text_analyzer",
        "query": "programming"
      }
    }
  }
}

GET test_custom_analyzer/_search
{
  "query": {
    "match": {
      "description": {
        "analyzer": "custom_text_analyzer",
        "query": "programmed"
      }
    }
  }
}

GET test_custom_analyzer/_search
{
  "query": {
    "match": {
      "description": {
        "analyzer": "custom_text_analyzer",
        "query": "program"
      }
    }
  }
}
