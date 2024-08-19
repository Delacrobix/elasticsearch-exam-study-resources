/** 
 * Task 1
 *
 */

GET stock-prices/_search
{
  "size": 0,
  "aggs": {
    "max_volume_for_month": {
      "date_histogram": {
        "field": "@timestamp",
        "calendar_interval":"month" 
      },
      "aggs": {
        "max_volume": {
          "max": {
            "field": "volume"
          }
        }
      }
    }
  }
}

/** 
 * Task 3
 *
 */

PUT _ilm/policy/datastream-lifecycle-policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms", 
        "actions": {
          "rollover": {
            "max_age": "3m"
          }
        }
      },
      "warm": {
        "min_age": "3m",
        "actions": {}
      },
      "cold": {
        "min_age": "8m",
        "actions": {}
      },
      "delete": {
        "min_age": "18m",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}

PUT _component_template/task3-mappings
{
  "template": {
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        }
      }
    }
  }
}

PUT _component_template/lifecycle-settings
{
  "template": {
    "settings": {
      "index.lifecycle.name": "datastream-lifecycle-policy"
    }
  }
}

PUT _index_template/task3
{
  "index_patterns": ["logs-my-app-production-*-*"],
  "data_stream": {},
  "composed_of": ["task3-mappings", "lifecycle-settings"]
}

PUT /_data_stream/logs-my-app-production-datastream