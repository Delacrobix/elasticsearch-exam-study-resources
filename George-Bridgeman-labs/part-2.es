#
# Exercise 13
#

PUT olympic-events-fixed
{
  "mappings": {
    "properties": {
      "athleteId": {
        "type": "integer"
      },
      "age": {
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
      "gender": {
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
      "medal": {
        "type": "keyword"
      }
    }
  }
}


POST _reindex
{
  "source": {
    "index": "olympic-events"
  },
  "dest": {
    "index": "olympic-events-fixed",
    "pipeline": "split_games"
  }
}

#
# Exercise 14
# 

GET olympic-events-fixed/_mapping

PUT _component_template/olympic-events-template
{
  "template": {
    "mappings": {
      "dynamic": "strict",
      "properties": {
        "athleteId": {
          "type": "integer"
        },
        "age": {
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
        "gender": {
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
        "medal": {
          "type": "keyword"
        }
      }
    }
  }
}

PUT _index_template/olympic-events
{
  "index_patterns": [
    "olympic-events-*"
  ],
  "composed_of": [
    "olympic-events-template"
  ]
}

#
# Exercise 15
#
PUT _ingest/pipeline/reconcile_fields
{
  "description": "This ingest pipeline will change the name fields to lowercase and rename some of them and execute split_games pipeline",
  "processors": [
    {
      "pipeline": {
        "name": "split_games"
      }
    },
    {
      "rename": {
        "field": "ID",
        "target_field": "athleteId"
      }
    },
    {
      "rename": {
        "field": "Age",
        "target_field": "age"
      }
    },
    {
      "rename": {
        "field": "Height",
        "target_field": "height"
      }
    },
    {
      "rename": {
        "field": "Weight",
        "target_field": "weight"
      }
    },
    {
      "rename": {
        "field": "Name",
        "target_field": "athleteName"
      }
    },
    {
      "rename": {
        "field": "Sex",
        "target_field": "gender"
      }
    },
    {
      "rename": {
        "field": "Team",
        "target_field": "team"
      }
    },
    {
      "rename": {
        "field": "NOC",
        "target_field": "noc"
      }
    },
    {
      "rename": {
        "field": "City",
        "target_field": "city"
      }
    },
    {
      "rename": {
        "field": "Sport",
        "target_field": "sport"
      }
    },
    {
      "rename": {
        "field": "Event",
        "target_field": "event"
      }
    },
    {
      "rename": {
        "field": "Medal",
        "target_field": "medal"
      }
    }
  ]
}

#
# Exersice 16
#

POST _ingest/pipeline/reconcile_fields/_simulate
{
  "docs": [
    {
      "index": "olympic-events-fixed",
      "_source": {
        "NOC": "ARG",
        "Sex": "M",
        "City": "Los Angeles",
        "Weight": "98",
        "Name": "Ernesto Arturo Alas",
        "Sport": "Shooting",
        "Games": "1984 Summer",
        "Event": "Shooting Men's Free Pistol, 50 metres",
        "Height": "186",
        "Team": "Argentina",
        "ID": 2224,
        "Medal": "NA",
        "Age": "54"
      }
    }
  ]
}

#
# Exercise 17
#

DELETE olympic-events-fixed

#
# Exercise 18
#

POST _reindex
{
  "source": {
    "index": "olympic-events"
  },
  "dest": {
    "index": "olympic-events-fixed",
    "pipeline": "reconcile_fields"
  }
}