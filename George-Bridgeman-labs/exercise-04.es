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