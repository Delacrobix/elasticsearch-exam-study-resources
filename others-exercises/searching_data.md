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

# Solutions

You can find the solution to these exercises in the file [searching_data](./solutions/searching_data.es).
