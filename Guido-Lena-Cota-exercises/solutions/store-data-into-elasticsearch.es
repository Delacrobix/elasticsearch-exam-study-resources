/**
 * * Exercise 1
 */

 // 1

PUT hamlet-raw
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 3
  }
}

// 2

PUT hamlet-raw/_doc/1
{
  "line": "To be, or not to be: that is the question"
}

// 3

POST hamlet-raw/_update/1
{
  "script": {
    "source": "ctx._source.line_number = '3.1.64'",
    "lang": "painless"
  }
}

// 4

POST hamlet-raw/_doc
{
  "text_entry": "Whether tis nobler in the mind to suffer",
  "line_number": "3.1.66"
}

// 5

POST hamlet-raw/_update_by_query
{
  "script": {
    "source": "ctx._source.line_number = '3.1.65'",
    "lang": "painless"
  },
  "query": {
    "match_phrase": {
      "text_entry": "Whether tis nobler in the mind to suffer"
    }
  }
}

// 6

POST hamlet-raw/_update
{
  "script": {
    "source": "ctx._source.speaker = 'Hamlet'",
    "lang": "painless"
  }, 
  "query": {
    "match_all": {}
  }
}

// 7

POST hamlet-raw/_update_by_query
{
  "script": {
    "source": "ctx._source.text_entry = ctx._source.line; ctx._source.remove('line') ",
    "lang": "painless"
  },
  "query": {
    "match": {
      "_id": 1
    }
  }
}

// 8 

PUT hamlet/_bulk
{"index":{"_index":"hamlet","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}
{"index":{"_index":"hamlet","_id":4}}
{"line_number":"1.2.2","speaker":"KING CLAUDIUS","text_entry":"The memory be green, and that it us befitted"}
{"index":{"_index":"hamlet","_id":5}}
{"line_number":"1.3.1","speaker":"LAERTES","text_entry":"My necessaries are embarkd: farewell:"}
{"index":{"_index":"hamlet","_id":6}}
{"line_number":"1.3.4","speaker":"LAERTES","text_entry":"But let me hear from you."}
{"index":{"_index":"hamlet","_id":7}}
{"line_number":"1.3.5","speaker":"OPHELIA","text_entry":"Do you doubt that?"}
{"index":{"_index":"hamlet","_id":8}}
{"line_number":"1.4.1","speaker":"HAMLET","text_entry":"The air bites shrewdly; it is very cold."}
{"index":{"_index":"hamlet","_id":9}}
{"line_number":"1.4.2","speaker":"HORATIO","text_entry":"It is a nipping and an eager air."}
{"index":{"_index":"hamlet","_id":10}}
{"line_number":"1.4.3","speaker":"HAMLET","text_entry":"What hour now?"}
{"index":{"_index":"hamlet","_id":11}}
{"line_number":"1.5.2","speaker":"Ghost","text_entry":"Mark me."}
{"index":{"_index":"hamlet","_id":12}}
{"line_number":"1.5.3","speaker":"HAMLET","text_entry":"I will."}

// 9 

POST _scripts/set_is_hamlet
{
  "script": {
    "lang": "painless",
    "source": "if(ctx._source.speaker == 'HAMLET'){ ctx._source.is_hamlet = true } else { ctx._source.is_hamlet = false }"
  }
}

// 10

POST hamlet/_update_by_query
{
  "script": {
    "id": "set_is_hamlet"
  },
  "query": {
    "match_all": {}
  }
}

// 11

POST hamlet/_delete_by_query
{
  "query": {
    "terms": {
      "speaker.keyword": [
        "KING CLAUDIUS",
        "LAERTES"
      ]
    }
  }
}

/**
 * * Exercise 2
 */


 // 1

PUT _index_template/hamlet_template
{
  "index_patterns": [
    "hamlet_*",
    "hamlet-*"
  ],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    }
  }
}

// 2

PUT hamlet2

PUT hamlet_test

// 3

// Should have not the settings of the template
GET hamlet2/_settings

// Should have the settings of the template
GET hamlet_test/_setting

// 4

PUT _index_template/hamlet_template
{
  "index_patterns": [
    "hamlet_*",
    "hamlet-*"
  ],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "properties": {
        "speaker": {
          "type": "text"
        },
        "line_number": {
          "type": "text"
        },
        "text_entry": {
          "type": "text",
          "analyzer": "english"
        }
      }
    }
  }
}

// 5

// Should have not mappings
GET hamlet_test/_mapping

// 6

DELETE hamlet*

// 7

PUT hamlet-1/_bulk
{"index":{"_index":"hamlet-1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet-1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet-1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet-1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}

// 8

// Should have the mappings and settings defined in the template
GET hamlet-1

// 9

PUT _index_template/hamlet_template
{
  "index_patterns": [
    "hamlet_*",
    "hamlet-*"
  ],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "dynamic": "strict",
      "properties": {
        "speaker": {
          "type": "text"
        },
        "line_number": {
          "type": "text"
        },
        "text_entry": {
          "type": "text",
          "analyzer": "english"
        }
      }
    }
  }
}

// 10

// Should thrown and exception
PUT hamlet-1
{
  "author": "Shakespeare"
}

// 11

PUT _index_template/hamlet_template
{
  "index_patterns": [
    "hamlet_*",
    "hamlet-*"
  ],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "dynamic": true,
      "properties": {
        "speaker": {
          "type": "text"
        },
        "line_number": {
          "type": "text"
        },
        "text_entry": {
          "type": "text",
          "analyzer": "english"
        }
      }
    }
  }
}

// 12

PUT _index_template/hamlet_template
{
  "index_patterns": [
    "hamlet_*",
    "hamlet-*"
  ],
  "template": {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "dynamic": true,
      "dynamic_templates": [
        {
          "map_number_fields": {
            "match": "number_*",
            "mapping": {
              "type": "integer"
            }
          }
        },
        {
          "map_unanalysed_text": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "keyword" // Keyword fields are unanalyzed
            }
          }
        }
      ]
    }
  }
}

// 13

POST hamlet-2/_doc/4
{
  "text_entry": "With turbulent and dangerous lunacy?",
  "line_number": "3.1.4",
  "number_act": "3",
  "speaker": "KING CLAUDIUS"
}

// 14

GET hamlet-2

/**
 * * Exercise 3
 */

// 1

PUT hamlet-1
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 0
  }
}

PUT hamlet-2
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 0
  }
}

// 2

PUT hamlet-1/_bulk
{"index":{"_index":"hamlet-1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet-1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet-1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet-1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}

// 3

PUT hamlet-2/_bulk
{"index":{"_index":"hamlet-2","_id":4}}
{"line_number":"2.1.1","speaker":"LORD POLONIUS","text_entry":"Give him this money and these notes, Reynaldo."}
{"index":{"_index":"hamlet-2","_id":5}}
{"line_number":"2.1.2","speaker":"REYNALDO","text_entry":"I will, my lord."}
{"index":{"_index":"hamlet-2","_id":6}}
{"line_number":"2.1.3","speaker":"LORD POLONIUS","text_entry":"You shall do marvellous wisely, good Reynaldo,"}
{"index":{"_index":"hamlet-2","_id":7}}
{"line_number":"2.1.4","speaker":"LORD POLONIUS","text_entry":"Before you visit him, to make inquire"}

// 4

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "hamlet-1",
        "alias": "hamlet"
      }
    },
    {
      "add": {
        "index": "hamlet-2",
        "alias": "hamlet"
      }
    }
  ]
}

// 5

// Hits should be 8
GET hamlet/_search
{
  "size": 0
}

// 6

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "hamlet-1",
        "alias": "hamlet",
        "is_write_index": true
      }
    }
  ]
}

// 7

POST hamlet/_doc/8
{
  "text_entry": "With turbulent and dangerous lunacy?",
  "line_number": "3.1.4",
  "speaker": "KING CLAUDIUS"
}

// 8

PUT _scripts/control_reindex_batch
{
  "script": {
    "lang": "painless",
    "source": """
      if(ctx._source.reindexBatch != null)
      { 
        ctx._source.reindexBatch = ctx._source.reindexBatch + params['increment'];
      } else { 
        ctx._source.reindexBatch = 1;
      }
    """
  }
}

// 9 

PUT hamlet-new
{
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 0
  }
}

// 10 

POST _reindex?slices=2
{
  "source": {
    "index": "hamlet"
  },
  "dest": {
    "index": "hamlet-new"
  },
  "script": {
    "id": "control_reindex_batch",
    "params": {
      "increment": 1
    }
  }
}

// 11

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "hamlet-new",
        "alias": "hamlet"
      }
    },
    {
      "remove_index": {
        "index": "hamlet-1"
      }
    },
    {
      "remove_index": {
        "index": "hamlet-2"
      }
    }
  ]
}

// 12

PUT _ingest/pipeline/split_act_scene_line
{
  "processors": [
    {
      "split": {
        "field": "line_number",
        "separator": "\\.",
        "target_field": "split_numbers"
      }
    },
    {
      "set": {
        "field": "number_act",
        "value": "{{split_numbers.0}}"
      }
    },
    {
      "set": {
        "field": "number_scene",
        "value": "{{split_numbers.1}}"
      }
    },
    {
      "set": {
        "field": "number_line",
        "value": "{{split_numbers.2}}"
      }
    },
    {
      "remove": {
        "field": "split_numbers"
      }
    }
  ]
}

// 13

POST _ingest/pipeline/split_act_scene_line/_simulate
{
  "docs": [
    {
      "_source": {
        "line_number": "1.2.3"
      }
    }
  ]
}

// 14

POST _reindex
{
  "source": {
    "index": "hamlet-new"
  },
  "dest": {
    "index": "hamlet-aux"
  }
}

DELETE hamlet-new

POST _reindex
{
  "source": {
    "index": "hamlet-aux"
  },
  "dest": {
    "index": "hamlet-new",
    "pipeline": "split_act_scene_line"
  }
}

GET hamlet-new/_search