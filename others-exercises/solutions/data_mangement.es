/**
*
* EXERSICE 1
*
**/

PUT _component_template/app_logs_mappings
{
  "template": {
    "mappings": {
      "_source": {
        "enabled": false
      },
      "properties": {
        "timestamp": {
          "type": "date"
        },
        "level": {
          "type": "keyword"
        },
        "message": {
          "type": "text"
        }
      }
    }
  }
}

PUT _component_template/app_log_settings
{
  "template": {
    "settings": {
      "number_of_replicas": 2,
      "number_of_shards": 3
    }
  }
}

PUT _index_template/app_logs_template
{
  "index_patterns": [
    "app-logs-*"
  ],
  "composed_of": [
    "app_logs_mappings",
    "app_log_settings"
  ]
}

POST app-logs-2024-08-07/_doc
{
  "timestamp": "2024-08-07T12:34:56Z",
  "level": "INFO",
  "message": "Application started successfully"
}

POST app-logs-2024-08-07/_doc
{
  "timestamp": "2024-08-07T12:35:10Z",
  "level": "ERROR",
  "message": "Failed to connect to database"
}

POST app-logs-2024-08-07/_doc
{
  "timestamp": "2024-08-07T12:35:45Z",
  "level": "WARN",
  "message": "Deprecated API call used"
}

GET app-logs-2024-08-07

/**
*
* EXERSICE 2
*
**/

PUT dynamic-template-index
{
  "mappings": {
    "dynamic_templates": [
      {
        "dates": {
          "match": "*_date",
          "mapping": {
            "type": "date"
          }
        }
      },
      {
        "keywords": {
          "match": "*_keyword",
          "mapping": {
            "type": "keyword"
          }
        }
      },
      {
        "texts": {
          "match": "*_text",
          "mapping": {
            "type": "text"
          }
        }
      },
      {
        "defaults": {
          "match": "*",
          "mapping": {
            "type": "text"
          }
        }
      }
    ]
  }
}

POST dynamic-template-index/_doc
{
  "event_date": "2024-08-07T12:34:56Z",
  "username_keyword": "user1",
  "message_text": "This is a log message",
  "additional_info": "Some additional information"
}

POST dynamic-template-index/_doc
{
  "creation_date": "2024-08-07T12:35:10Z",
  "user_keyword": "user2",
  "log_text": "Another log message",
  "extra_details": "Some extra details"
}


GET dynamic-template-index/_mapping
