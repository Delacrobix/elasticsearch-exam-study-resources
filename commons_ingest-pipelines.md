# Ingest pipelines

Here are some notes on most commons aggregations in Elasticsearch. So this is the most used I suggest you read about all of them in the official documentation.

|**Processors**                                                                                   |**Use**                                                                  |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
|[Grok](https://www.elastic.co/guide/en/elasticsearch/reference/current/grok-processor.html)      |Extracts structured fields out of a single text field within a document. |
|[Script](https://www.elastic.co/guide/en/elasticsearch/reference/current/script-processor.html)  |Runs a script in a ingest context.                                       |
|[Remove](https://www.elastic.co/guide/en/elasticsearch/reference/current/remove-processor.html)  |Used to remove a field.                                                  |
|[Rename](https://www.elastic.co/guide/en/elasticsearch/reference/current/rename-processor.html)  |Used to rename a field.                                                  |
|[Enrich](https://www.elastic.co/guide/en/elasticsearch/reference/current/enrich-processor.html)  |Can be used to enrich documents with data from another index.            |  

Don't forget read about the enrich policy in the [official documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/enrich-setup.html#create-enrich-policy).