# Exercise 1: Define and Use a Custom Analyzer in Elasticsearch

## Objective

Learn how to define a custom analyzer in Elasticsearch and use it in search queries to meet specific text processing requirements.

## Instructions

### 1. Create an Index with a Custom Analyzer:

- The index name should be `test_custom_analyzer`.
- Define a custom analyzer named `custom_text_analyzer` that meets the following requirements:

  - Tokenizer: `standard`
  - Filters:
    - `lowercase` to convert all tokens to lowercase.
    - `stop` to remove common English stop words.
    - `porter_stem` to apply Porter stemming for reducing words to their root form.
    - `asciifolding` to replace accented characters with their ASCII equivalents.

- The mappings should include the following fields:
  - `title` of type `text` using the `custom_text_analyzer`.
  - `description` of type `text` using the `custom_text_analyzer`.
  - `category` of type `keyword`.

### 2. Index Sample Data:

Now, index some sample data into the `test_custom_analyzer` index. You can use the following data:

```json
POST /test_custom_analyzer/_bulk
{ "index": {} }
{ "title": "Fantastic Electronics", "description": "The latest in electronic gadgets and devices", "category": "electronics" }
{ "index": {} }
{ "title": "Books on Technology", "description": "A comprehensive guide to modern technology", "category": "books" }
{ "index": {} }
{ "title": "Stylish Clothing", "description": "Fashionable and comfortable clothing", "category": "clothing" }
{ "index": {} }
{ "title": "Advanced Programming Books", "description": "Deep dive into advanced programming concepts", "category": "books" }
{ "index": {} }
{ "title": "Home Appliances", "description": "The best appliances for your home", "category": "electronics" }
{ "index": {} }
{ "title": "Fitness Gear", "description": "Everything you need to stay fit and healthy", "category": "clothing" }
```

### 3. Implement a Search Query with a Custom Analyzer:

- Implement a search query to retrieve documents where the description field contains the term "technology".
- Use the custom analyzer to ensure that the search is performed on stemmed and lowercased tokens.

### 4. Test the Custom Analyzer:

- Test the custom analyzer by searching for various forms of a word, such as "programming", "programmed", and "program".
- Analyze how the custom analyzer handles these variations.

# Solutions

You can find the solution to these exercises in the file [data_processing](./solutions/data_processing.es).
