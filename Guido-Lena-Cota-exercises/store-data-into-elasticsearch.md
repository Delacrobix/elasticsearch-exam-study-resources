# Exercises for the Elastic Certified Engineer Exam: Store Data into Elasticsearch by Guido Lena Cota

This exercises was extracted from the blog post by Guido Lena Cota, [Exercises for the Elastic Certified Engineer Exam: Store Data into Elasticsearch.](https://kreuzwerker.de/en/post/exercises-for-the-elastic-certified-engineer-exam-store-data-into)

## Exercise 1

### Objective

Create, update and delete indices while satisfying a given set of requirements.

### Instructions

1. Create the index `hamlet-raw` with one primary shard and three replicas.
2. Add a document to `hamlet-raw`, so that the document:
   1. has id "1"
   2. has default type
   3. has one field named `line` with value "To be, or not to be: that is the question"
3. Update the document with id "1" by adding a field named `line_number` with value "3.1.64"
4. Add a new document to `hamlet-raw`, so that the document:
   1. has the id automatically assigned by Elasticsearch
   2. has default type
   3. has a field named `text_entry` with value "Whether tis nobler in the mind to suffer"
   4. has a field named `line_number` with value "3.1.66"
5. Update the last document by setting the value of `line_number` to "3.1.65"
6. In one request, update all documents in `hamlet-raw` by adding a new field named `speaker` with value "Hamlet"
7. Update the document with id "1" by renaming the field `line` into `text_entry`
8. Create the index `hamlet` and add some documents by running the following \_bulk API

```json
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
```

9. Create a script named `set_is_hamlet` and save it into the cluster state. The script:
   1. adds a field named `is_hamlet` to each document
   2. sets the field to "true" if the document has `speaker` equals to "HAMLET"
   3. sets the field to "false" otherwise
10. Update all documents in `hamlet` by running the `set_is_hamlet` script
11. Remove from `hamlet` the documents that have either "KING CLAUDIUS" or "LAERTES" as the value of `speaker`

## Exercise 2

### Objective

Create index templates that satisfy a given set of requirements.

### Instructions

1.  Create the index template `hamlet_template`, so that the template:
    1.  matches any index that starts by "hamlet\_" or "hamlet-"
    2.  allocates one primary shard and no replicas for each matching index
2.  Create the indices `hamlet2` and `hamlet_test`
3.  Verify that only `hamlet_test` applies the settings defined in `hamlet_template`
4.  Update `hamlet_template` by defining a mapping so that:
    1.  the type has three fields, named `speaker`, `line_number`, and `text_entry`
    2.  `text_entry` uses an "english" analyzer
5.  Verify that the updates in `hamlet_template` did not apply to the existing indices
6.  In one request, delete both `hamlet2` and `hamlet_test`
7.  Create the index `hamlet-1` and add some documents by running the following \_bulk command

```json
PUT hamlet-1/_bulk
{"index":{"_index":"hamlet-1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet-1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet-1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet-1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}

```

8. Verify that the mapping of `hamlet-1` is consistent with what defined in `hamlet_template`
9. Update `hamlet_template` so as to reject any document having a field that is not defined in the mapping
10. Verify that you cannot index the following document in `hamlet-1`

```json
PUT hamlet-1
{
  "author": "Shakespeare"
}
```

11. Update `hamlet_template` so as to enable dynamic mapping again
12. Update `hamlet_template` so as to:
    1.  dynamically map to an integer any field that starts by "number\_"
    2.  dynamically map to unanalysed text any string field
13. Create the index `hamlet-2` and add a document by running the following command

```json
POST hamlet-2/_doc/4
{
  "text_entry": "With turbulent and dangerous lunacy?",
  "line_number": "3.1.4",
  "number_act": "3",
  "speaker": "KING CLAUDIUS"
}
```

14. Verify that the mapping of `hamlet-2` is consistent with what defined in `hamlet_template`

## Exercise 3

### Objective

Create an alias, reindex indices, and create data pipelines.

### Instructions

1. Create the indices `hamlet-1` and `hamlet-2`, each with two primary shards and no replicas
2. Add some documents to `hamlet-1` by running the following \_bulk command

```json
PUT hamlet-1/_bulk
{"index":{"_index":"hamlet-1","_id":0}}
{"line_number":"1.1.1","speaker":"BERNARDO","text_entry":"Whos there?"}
{"index":{"_index":"hamlet-1","_id":1}}
{"line_number":"1.1.2","speaker":"FRANCISCO","text_entry":"Nay, answer me: stand, and unfold yourself."}
{"index":{"_index":"hamlet-1","_id":2}}
{"line_number":"1.1.3","speaker":"BERNARDO","text_entry":"Long live the king!"}
{"index":{"_index":"hamlet-1","_id":3}}
{"line_number":"1.2.1","speaker":"KING CLAUDIUS","text_entry":"Though yet of Hamlet our dear brothers death"}
```

3. Add some documents to `hamlet-2` by running the following \_bulk command

```json
PUT hamlet-2/_bulk
{"index":{"_index":"hamlet-2","_id":4}}
{"line_number":"2.1.1","speaker":"LORD POLONIUS","text_entry":"Give him this money and these notes, Reynaldo."}
{"index":{"_index":"hamlet-2","_id":5}}
{"line_number":"2.1.2","speaker":"REYNALDO","text_entry":"I will, my lord."}
{"index":{"_index":"hamlet-2","_id":6}}
{"line_number":"2.1.3","speaker":"LORD POLONIUS","text_entry":"You shall do marvellous wisely, good Reynaldo,"}
{"index":{"_index":"hamlet-2","_id":7}}
{"line_number":"2.1.4","speaker":"LORD POLONIUS","text_entry":"Before you visit him, to make inquire"}
```

4. Create the alias `hamlet` that maps both `hamlet-1` and `hamlet-2`
5. Verify that the documents grouped by `hamlet` are 8
6. Configure `hamlet-1` to be the write index of the `hamlet` alias
7. Add a document to `hamlet`, so that the document:
   1. has id "8"
   2. has a field `text_entry` with value "With turbulent and dangerous lunacy?"
   3. has a field `line_number` with value "3.1.4"
   4. has a field `speaker` with value "KING CLAUDIUS"
8. Create a script named `control_reindex_batch` and save it into the cluster state. The script checks whether a document has the field `reindexBatch`, and:
   1. in the affirmative case, it increments the field value by a script parameter named `increment`
   2. otherwise, the script adds the field to the document setting its value to "1"
9. Create the index `hamlet-new` with two primary shards and no replicas
10. Reindex `hamlet` into `hamlet-new`, while satisfying the following criteria:
    1. apply the `control_reindex_batch` script with the `increment` parameter set to "1"
    2. reindex using two parallel slices
11. In one request, add `hamlet-new` to the alias `hamlet` and delete the `hamlet-1` and `hamlet-2` indices
12. Create a pipeline named `split_act_scene_line`. The pipeline splits the value of `line_number` using the dots as a separator, and stores the split values into three new fields named `number_act`, `number_scene`, and `number_line`, respectively
13. Test the pipeline on the following document

```json
{
  "_source": {
    "line_number": "1.2.3"
  }
}
```

14. Update all documents in `hamlet-new` by using the `split_act_scene_line` pipeline


## Solutions


You can find the solution to these exercises in the file [store-data-into-elasticsearch.](./solutions/store-data-into-elasticsearch.es)