# Exercise 1: Write and Execute a Search Query for Terms and/or Phrases in One or More Fields of an Index

## Objective

Learn how to write and execute search queries in Elasticsearch to retrieve documents that contain specific terms or phrases within one or more fields of an index.

## Instructions

### 1. Create an Index with Mapped Fields:

- Define an index with the name `search_example_index`.
- Include fields such as `title`, `content`, `author`, `published_date` and `tags` with appropriate data types.

### 2. Index Example Documents

Index a few documents into search_example_index to populate it with data. You can use the following:

```json
POST /search_example_index/_doc/1
{
  "title": "Introduction to Elasticsearch",
  "content": "Elasticsearch is a distributed, RESTful search and analytics engine.",
  "author": "Alice",
  "tags": ["elasticsearch", "search"],
  "published_date": "2024-08-01"
}

POST /search_example_index/_doc/2
{
  "title": "Advanced Elasticsearch Queries",
  "content": "Learn about advanced querying techniques in Elasticsearch.",
  "author": "Bob",
  "tags": ["elasticsearch", "queries"],
  "published_date": "2024-08-05"
}

POST /search_example_index/_doc/3
{
  "title": "Mastering Kibana",
  "content": "Kibana is the visualization layer that works with Elasticsearch.",
  "author": "Charlie",
  "tags": ["kibana", "visualization"],
  "published_date": "2024-08-10"
}
```

### 3. Write and Execute Search Queries

Write and execute the following search queries:

- Search word 'Elasticsearch' in the `content` Field.
- Search for Phrase 'Advanced Elasticsearch Queries' in the `title` Field.
- Search for 'visualization' across `tags` and `content` Fields.

# Exercise 2: Write and Execute a Search Using a Runtime Field

## Objective

Learn how to create a runtime field in your index mappings and use it in a search query.

## Instructions

### 1. Define Mappings with a Runtime Field:

- The index name should be `test_runtime`.
- The mappings should include the `price` field with type `double` and `quantity` field with type `integer`.
- Define a runtime field `total_value` that calculates the total value by multiplying the `price` and `quantity` fields.

### 2. Index Sample Data:

Now index some sample data into the `test_runtime` index. You can use the following data:

```json
POST /test_runtime/_bulk
{ "index": {} }
{ "price": 10.0, "quantity": 2 }
{ "index": {} }
{ "price": 15.5, "quantity": 4 }
{ "index": {} }
{ "price": 7.0, "quantity": 10 }
```

# Exercise 3: Search Across Multiple Clusters

## Objective

Learn how to configure cross-cluster search in Elasticsearch, create an index on a remote cluster, and execute a search query across multiple clusters.

## Instructions

### 1. Set Up the Cross-Cluster Connection:

- Use the docker-compose file provided to set up two Elasticsearch clusters. [2_es-node 2_kibana](../docker-environments/2es-2kb.yml)
- Connect your local cluster `es-west` to a remote cluster `es-east` by configuring the cluster settings.
- Confirm that the connection is successful by checking the remote info.

### 2. Create an Index on the Remote Cluster:

- Create an index named `remote_index` on the cluster `es-east` with the following mappings:
  - `title` field of type `text`.
  - `description` field of type `text`.
  - `category` field of type `keyword`.

### 3. Index Sample Data Remotely:

- Index some sample data into the `remote_index` on the `es-east` cluster. You can use the following data:

```json
POST remote_index/_bulk
{ "index": {} }
{ "title": "Remote Product 1", "description": "Description for remote product 1", "category": "electronics" }
{ "index": {} }
{ "title": "Remote Product 2", "description": "Description for remote product 2", "category": "clothing" }
{ "index": {} }
{ "title": "Remote Product 3", "description": "Description for remote product 3", "category": "books" }
```

### 4. Execute a Cross-Cluster Search Query:

- Perform a search query from the local cluster `es-west` that retrieves all documents from the `remote_index` on the remote cluster `es-east`.

# Solutions

You can find the solution to these exercises in the file [searching_data](./solutions/searching_data.es).
