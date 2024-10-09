# Exercises for the Elastic Certified Engineer Exam: Model Data into Elasticsearch by Guido Lena Cota

This exercises was extracted from the blog post by Guido Lena Cota, [Elastic Certified Engineer Exam: Model Data into Elasticsearch.](https://kreuzwerker.de/en/post/exercises-for-the-elastic-certified-engineer-exam-model-data-into)

## Exercise 1

### Objective

Create a mapping that satisfies a given set of requirements.

### Instructions

1. Create the index `hamlet_1` with one primary shard and no replicas, finally define a mapping for `hamlet_1`, so that:
   1. the type has three fields, named `speaker`, `line_number`, and `text_entry`
   2. `speaker` and `line_number` are unanalysed strings
   3. disable aggregations on `line_number`
2. Add some documents to `hamlet_1` by running the following \_bulk command

```json
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
```

3. Create the index `hamlet_2` with:
   1. one primary shard and no replicas.
   2. Copy the mapping of `hamlet_1` into `hamlet_2`, but also define a multi-field for `speaker`. The name of such multi-field is `tokens` and its data type is the (default) analysed string.
4. Reindex `hamlet_1` to `hamlet_2`.
5. Verify that full-text queries on "speaker.tokens" are enabled on `hamlet_2` by running the following command:

```json
GET hamlet_2/_search
{
  "query": {
    "match": { "speaker.tokens": "king" }
  }
}
```

## Exercise 2

### Objective

Model relational data.

### Instructions

1. Create the index `hamlet_1` with one primary shard and no replicas.
2. Add some documents to `hamlet_1` by running the following `_bulk` command

```json
PUT hamlet_1/_bulk
{"index":{"_index":"hamlet_1","_id":"C0"}}
{"name":"HAMLET","relationship":[{"name":"HORATIO","type":"friend"},{"name":"GERTRUDE","type":"mother"}]}
{"index":{"_index":"hamlet_1","_id":"C1"}}
{"name":"KING CLAUDIUS","relationship":[{"name":"HAMLET","type":"nephew"}]}
```

3. Verify that the items of the `relationship` array cannot be searched independently - e.g., searching for a friend named Gertrude will return 1 hit.

```json
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
```
4. Create the index `hamlet_2` with:
   1.  one primary shard and no replicas.
   2.  Define a mapping for  `hamlet_2`, so that the inner objects of the `relationship` field
       1.  can be searched independently
       2.  have only unanalyzed fields
5. Reindex `hamlet_1` to `hamlet_2`.
6. Verify that the items of the `relationship` array can now be searched independently - e.g, searching for a friend named Gertrude will return no hits.

```json
GET hamlet_2/_search 
{
  "query": {
    "nested": {
      "path": "relationship",
      "query": {
        "bool": {
          "must": [
            { "match": { "relationship.name": "gertrude" }},
            { "match": { "relationship.type":  "friend" }} 
          ]
        }
      }
    }
  }
}
```

7. Add more documents to `hamlet_2` by running the following `_bulk` command:

```json
PUT hamlet_2/_bulk
{"index":{"_index":"hamlet_2","_id":"L0"}}
{"line_number":"1.4.1","speaker":"HAMLET","text_entry":"The air bites shrewdly; it is very cold."}
{"index":{"_index":"hamlet_2","_id":"L1"}}
{"line_number":"1.4.2","speaker":"HORATIO","text_entry":"It is a nipping and an eager air."}
{"index":{"_index":"hamlet_2","_id":"L2"}}
{"line_number":"1.4.3","speaker":"HAMLET","text_entry":"What hour now?"}
```
8. Create the index `hamlet_3` with:
   1. Only one primary shard and no replicas.
   2. Copy the mapping of `hamlet_2` into `hamlet_3`, but also add a join field to define a relation between a `character` (the parent) and a `line` (the child). The name of such field is "character_or_line"
9.  Reindex `hamlet_2` to `hamlet_3`
10. Create a script named `init_lines` and save it into the cluster state. The script:
    1.  has a parameter named `characterId`
    2.  adds the field `character_or_line` to the document
    3.  sets the value of `character_or_line.name` to "line"
    4.  sets the value of `character_or_line.parent` to the value of the `characterId` parameter
11. Update the document with id `C0` (i.e., the character document of Hamlet) by adding the field `character_or_line` and setting its `character_or_line.name` value to "character"
12. Update the documents in `hamlet_3` that have "HAMLET" as a `speaker`, by running the `init_lines` script with `characterId` set to "C0"
13. Verify that the last operation was successful by running the query below:

```json
GET hamlet_3/_search
{
  "query": {
    "has_parent": {
      "parent_type": "character",
      "query": {
        "match": { "name": "HAMLET" }
      }
    }
  }
}
```

## Exercise 3

### Objective

Add built-in text analyzers and specify a custom one.

### Instructions

1. Create the index `hamlet_1` with:
    1. one primary shard and no replicas.
    2. the type has three fields, named `speaker`, `line_number`, and `text_entry` 
    3. `text_entry` is associated with the language "english" analyzer.
2. Add some documents to `hamlet_1` by running the following _bulk command:

```json
PUT hamlet_1/_bulk
{"index":{"_index":"hamlet_1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet_1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet_1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet_1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}
```
3. Create the index `hamlet_2` with:
    1. one primary shard and no replicas.
    2. Add to `hamlet_2` a custom analyzer named `shy_hamlet_analyzer`, consisting of: 
        1. a char filter to replace the characters "Hamlet" with "[CENSORED]"
        2. a tokenizer to split tokens on whitespaces and columns
        3. a token filter to ignore any token with less than 5 characters
    3. Define a mapping for `hamlet_2`, so that:
        1. the type has one field named `text_entry`
        2. `text_entry` is associated with the `shy_hamlet_analyzer` created in the previous step.
4. Reindex the `text_entry` field of `hamlet_1` into `hamlet_2`
5. Verify that documents have been reindexed to `hamlet_2` as expected - e.g., by searching for "censored" into the `text_entry` field.

## Solutions


You can find the solution to these exercises in the file [model-data-into-elasticsearch.es](./solutions/model-data-into-elasticsearch.es)