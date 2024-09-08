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