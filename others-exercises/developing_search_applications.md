# Exercise 1: Implement Pagination for a Search Query

## Objective

Learn how to implement pagination in Elasticsearch search queries to efficiently retrieve large sets of search results.

## Instructions

### 1. Create an Index and Define Mappings:

- The index name should be `test_pagination`.
- The mappings should include the following fields:
  - `title` of type `text`.
  - `description` of type `text`.
  - `category` of type `keyword`.

### 2. Index Sample Data:

Now, index some sample data into the `test_pagination` index. You can use the following data:

```json
POST /test_pagination/_bulk
{ "index": {} }
{ "title": "Product 1", "description": "Description for product 1", "category": "electronics" }
{ "index": {} }
{ "title": "Product 2", "description": "Description for product 2", "category": "electronics" }
{ "index": {} }
{ "title": "Product 3", "description": "Description for product 3", "category": "clothing" }
{ "index": {} }
{ "title": "Product 4", "description": "Description for product 4", "category": "clothing" }
{ "index": {} }
{ "title": "Product 5", "description": "Description for product 5", "category": "books" }
{ "index": {} }
{ "title": "Product 6", "description": "Description for product 6", "category": "books" }
{ "index": {} }
{ "title": "Product 7", "description": "Description for product 7", "category": "electronics" }
{ "index": {} }
{ "title": "Product 8", "description": "Description for product 8", "category": "clothing" }
{ "index": {} }
{ "title": "Product 9", "description": "Description for product 9", "category": "books" }
{ "index": {} }
{ "title": "Product 10", "description": "Description for product 10", "category": "clothing" }
```

### 3. Implement Pagination in Search Queries:

- Perform a search query to retrieve all documents in the electronics category.
- Implement pagination by retrieving only the first 3 results.

### 4. Retrieve the Next Page of Results:

- Modify the query to retrieve the next 3 results (the second page).
