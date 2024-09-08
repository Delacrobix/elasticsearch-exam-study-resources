/**
 * * Exercise 1
 */

 // 1

PUT hamlet_1
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "speaker": {
        "type": "keyword"
      },
      "line_number": {
        "type": "keyword",
        "doc_values": false
      },
      "text_entry": {
        "type": "text"
      }
    }
  }
}

// 2

PUT hamlet_1/_bulk
{"index":{"_index":"hamlet_1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet_1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet_1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet_1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet     our dear brothers death"}
{"index":{"_index":"hamlet_1","_id":4}}
{"line_number":"1.2.2","speaker":"KING CLAUDIUS","text_entry":"The memory be green,    and that it us befitted"}

// 3

PUT hamlet_2
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "speaker": {
        "type": "keyword",
        "fields": {
          "tokens": {
            "type": "text"
          }
        }
      },
      "line_number": {
        "type": "keyword",
        "doc_values": false
      },
      "text_entry": {
        "type": "text"
      }
    }
  }
}

// 4

POST _reindex
{
  "source": {
    "index": "hamlet_1"
  },
  "dest": {
    "index": "hamlet_2"
  }
}

// 5

GET hamlet_2/_search
{
  "query": {
    "match": {
      "speaker.tokens": "king"
    }
  }
}

/**
 * * Exercise 2
 */

 // Deleting data from the first exercise

DELETE hamlet_*

// 1

PUT hamlet_1
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  }
}

// 2

PUT hamlet_1/_bulk
{"index":{"_index":"hamlet_1","_id":"C0"}}
{"name":"HAMLET","relationship":[{"name":"HORATIO","type":"friend"},{"name":"GERTRUDE","type":"mother"}]}
{"index":{"_index":"hamlet_1","_id":"C1"}}
{"name":"KING CLAUDIUS","relationship":[{"name":"HAMLET","type":"nephew"}]}

// 3

GET hamlet_1/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "relationship.name": "gertrude"
          }
        },
        {
          "match": {
            "relationship.type": "friend"
          }
        }
      ]
    }
  }
}

// 4

PUT hamlet_2
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "relationship": {
        "type": "nested",
        "properties": {
          "name": {
            "type": "keyword"
          },
          "type": {
            "type": "keyword"
          }
        }
      }
    }
  }
}

// 5

POST _reindex
{
  "source": {
    "index": "hamlet_1"
  },
  "dest": {
    "index": "hamlet_2"
  }
}

// 6

GET hamlet_2/_search
{
  "query": {
    "nested": {
      "path": "relationship",
      "query": {
        "bool": {
          "must": [
            {
              "match": {
                "relationship.name": "gertrude"
              }
            },
            {
              "match": {
                "relationship.type": "friend"
              }
            }
          ]
        }
      }
    }
  }
}

// 7

PUT hamlet_2/_bulk
{"index":{"_index":"hamlet_2","_id":"L0"}}
{"line_number":"1.4.1","speaker":"HAMLET","text_entry":"The air bites shrewdly; it is very cold."}
{"index":{"_index":"hamlet_2","_id":"L1"}}
{"line_number":"1.4.2","speaker":"HORATIO","text_entry":"It is a nipping and an eager air."}
{"index":{"_index":"hamlet_2","_id":"L2"}}
{"line_number":"1.4.3","speaker":"HAMLET","text_entry":"What hour now?"}

// 8

PUT hamlet_3
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "relationship": {
        "type": "nested",
        "properties": {
          "name": {
            "type": "keyword"
          },
          "type": {
            "type": "keyword"
          }
        }
      },
      "character_or_line": {
        "type": "join",
        "relations": {
          "character": "line"
        }
      }
    }
  }
}

// 9

POST _reindex
{
  "source": {
    "index": "hamlet_2"
  },
  "dest": {
    "index": "hamlet_3"
  }
}

// 10

PUT _scripts/init_lines
{
  "script": {
    "lang": "painless",
    "source": """
      ctx._source.character_or_line = new HashMap();
      ctx._source.character_or_line.name = "line";
      ctx._source.character_or_line.parent = params.characterId;
    """
  }
}


// 11

POST hamlet_3/_update/C0
{
  "doc": {
    "character_or_line": {
      "name": "character"
    }
  }
}


// 12

GET hamlet_3/_mapping

POST hamlet_3/_update_by_query
{
  "script": {
    "id": "init_lines",
    "params": {
      "characterId": "C0"
    }
  },
  "query": {
    "match_all": {}
  }
}

// 13

GET hamlet_3/_search
{
  "query": {
    "has_parent": {
      "parent_type": "character",
      "query": {
        "match": {
          "name.keyword": "HAMLET"
        }
      }
    }
  }
}
