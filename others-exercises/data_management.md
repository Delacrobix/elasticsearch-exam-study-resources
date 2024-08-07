# Exercise 1: Create Component Templates and an Index Template for Application Logs

## Objective

Create a component template and an index template with specific configurations for indices that store application logs.

## Instructions

### 1. Create a Component Template for Mappings:

- **Name**: `app_log_mappings`
- **Fields**:
  - `timestamp`: type `date`
  - `level`: type `keyword`
  - `message`: type `text`

### 2. Create a Component Template for Settings:

- **Name**: `app_log_settings`
- **Settings**:
  - `number_of_shards`: `3`
  - `number_of_replicas`: `2`

### 3. Create an Index Template:

- **Name**: `app_logs_template`
- **Index Pattern**: `app-logs-*`
- **Composed of**: `app_log_mappings`, `app_log_settings`

### 4. Create an Index to Verify:

- Verify the Index Configuration

# Exercise 2: Create Dynamic Templates for Dynamic Fields

## Objective

Use Elasticsearch's dynamic templates to handle dynamic fields with different data types that are not known in advance.

## Instructions

### 1. Create a Dynamic Template for Dynamic Fields

Create a dynamic template that allows indexing dynamic fields with different data types. This template should handle the following cases:

- The index should be named `dynamic_template_index`.
- Fields ending in `_date` should be indexed as type `date`.
- Fields ending in `_keyword` should be indexed as type `keyword`.
- Fields ending in `_text` should be indexed as type `text`.
- Any other field should be indexed as type `text`.

### 2. Index Example Documents

Index some documents that contain dynamic fields to verify that the dynamic templates work correctly.

# Solutions

You can find the solution to these exercises in the file [data_management](./solutions/data_mangement.es).
