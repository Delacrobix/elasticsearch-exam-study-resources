#
# Exercise 25
#

GET olympic-events-fixed/_search
{
  "size": 50, 
  "sort": [
    {
      "age": {
        "order": "desc"
      }
    }
  ], 
  "query": {
    "bool": {
      "must": [
        {
         "term": {
           "medal": {
             "value": "Gold"
           }
         } 
        },
        {
         "term": {
           "sport": {
             "value": "Athletics"
           }
         } 
        }
      ]
    }
  }
}

#
# Exercise 26
#

GET olympic-events-fixed/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "sport": {
              "value": "Swimming"
            }
          }
        }
      ],
      "should": [
        {
          "range": {
            "weight": {
              "gte": 60,
              "lte": 70
            }
          }
        },
        {
          "range": {
            "age": {
              "lt": 20
            }
          }
        }
      ]
    }
  }
}

#
# Exercise 28
#

PUT olympic-noc-regions/_settings
{
  "number_of_replicas": 0
}

GET _cat/indices/olympic-noc-regions

#
# Exercise 29
#

PUT _enrich/policy/olympic-noc-append
{
  "match": {
    "indices": "olympic-noc-regions",
    "match_field": "noc",
    "enrich_fields": ["noc", "notes", "region"]
  }
}

POST /_enrich/policy/olympic-noc-append/_execute

PUT _ingest/pipeline/enrich-noc
{
  "processors": [
    {
      "enrich": {
        "policy_name": "olympic-noc-append",
        "field": "noc",
        "target_field": "nocDetails"
      }
    }
  ]
}

POST _ingest/pipeline/enrich-noc/_simulate
{
  "docs": [
    {
      "_source": {
        "noc": "ARG",
        "gender": "M",
        "year": "1984",
        "city": "Los Angeles",
        "weight": "98",
        "team": "Argentina",
        "athleteId": 2224,
        "medal": "NA",
        "season": "Summer",
        "athleteName": "Ernesto Arturo Alas",
        "event": "Shooting Men's Free Pistol, 50 metres",
        "sport": "Shooting",
        "age": "54",
        "height": "186"
      }
    }
  ]
}

#
# Exercise 30
#

PUT olympic-events-enriched
{
  "mappings": {
    "dynamic": true
  }
}

GET olympic-events-enriched/_mapping

#
# Exercise 31
#

POST _reindex
{
  "source": {
    "index": "olympic-events-fixed"
  },
  "dest": {
    "index": "olympic-events-enriched",
    "pipeline": "enrich-noc"
  }
}

GET olympic-events-enriched/_search
{
  "size": 10,
  "query": {
    "match_all": {}
  }
}