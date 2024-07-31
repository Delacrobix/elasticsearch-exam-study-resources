// * The following exercises was extracted from the YouTube video: https://www.youtube.com/watch?v=9UpB-s_ZfNE&t=1579s

/** 
  NAME: Task 1

  DESCRIPTION: Write a single search on the `stock-prirces` index on `cluster1` that satisfies the followinf requirements:

    - Retruns the stock with the highest daily volume of the month.
    - returns 0 documents.
 */

/**
  One document of the `stock-prices` index looks like this:
  {
    "_index": "stock-prices",
    "_type": "_doc",
    "_id": "1",
    "_score": 1.0,
    "_source": {
      "low_price": 24.264,
      "high_price": 24.73,
      "@timestamp": "2020-01-01T00:00:00.000Z",
      "opening_price": 24.4,
      "volume": 28031,
      "closing_price": 24.52,
      "symbol": "ADSK"
    }
  }
 */

// ANSWER

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
  NAME: Task 3

  DESCRIPTION: Define a new data stream on `cluster1` that satisfies the following requirements:

    - the index pattern is `logs-my-app-production`
    - the corresponding index template is named `task3`
    - the data is hot for 3 minutes, then inmediately rolls over warm.
    - the data is warm for 5 minutes, then rolls over cold.
    - 10 minutes after rolling over, the data is deleted.
 */

 // NOTE: This exercise is easier to resolve using the Kibana UI but you can to use Elasticsearch API to resolve it.

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