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

# Exercise 2: Define and Use a Search Template

## Objective

Learn how to create and use a search template in Elasticsearch to simplify and reuse search queries.

## Instructions

### 1. Create an Index and Define Mappings:

- The index name should be `test_products`.
- The mappings should include the following fields:
  - `name` of type `text`.
  - `description` of type `text`.
  - `category` of type `keyword`.
  - `price` of type `double`.

### 2. Index Sample Data:

- Now, index some sample data into the `test_products` index. You can use the following data:

```json
POST /test_products/_bulk
{ "index": {} }
{ "name": "Laptop", "description": "A powerful laptop", "category": "electronics", "price": 1200.0 }
{ "index": {} }
{ "name": "Smartphone", "description": "A high-end smartphone", "category": "electronics", "price": 800.0 }
{ "index": {} }
{ "name": "Jeans", "description": "Comfortable jeans", "category": "clothing", "price": 50.0 }
{ "index": {} }
{ "name": "Sneakers", "description": "Stylish sneakers", "category": "clothing", "price": 120.0 }
{ "index": {} }
{ "name": "Book", "description": "A thrilling novel", "category": "books", "price": 15.0 }
{ "index": {} }
{ "name": "Tablet", "description": "A lightweight tablet", "category": "electronics", "price": 300.0 }
```

### 3. Create a Search Template:

- Define a search template named `product_search_template`.
- The template should allow you to search for products based on a `category` and a `minimum price`.
- The template should include a query that matches documents where the `category` matches a specified value and the `price` is greater than or equal to the specified minimum price.

### 4. Execute a Search Using the Template:

- Use the `product_search_template` to search for products in the electronics category with a minimum price of 500.

# Solutions

You can find the solution to these exercises in the file [data_management](./solutions/developing_search_applications.es).
