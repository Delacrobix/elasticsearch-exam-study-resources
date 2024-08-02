# Elasticsearch Certified exam study resources

Here is a list of resources that I used to study for the Elasticsearch Certified Engineer exam. I share them with you in case you find them useful.

## `.es` files

I used the VSCode extension [Elasticsearch for VSCode](https://marketplace.visualstudio.com/items?itemName=ria.elastic) that allows you to run queries and see the results directly in the editor. However, I personally recommend using Kibana Devtools for studying and using `.es` files to save your queries.

## Folders

In each folder, you can find descriptions of the resources that I used to study for the exam.

- [Gustavo-Llermaly-udemy-course-exercises](Gustavo-Llermaly-udemy-course-exercises/README.md)
- [George-Bridgeman-labs](George-Bridgeman-labs/README.md)
- [docker-environments](docker-environments/README.md)
- [other-exercises](other-exercises/README.md)

## Currently exam topics

The following information covers the current topics for the 2024 exam.

### Topics

Elastic Certified Engineer exam is currently on version 8.1.

#### Data Management

- Define an index that satisfies a given set of requirements
- Define and use an index template for a given pattern that satisfies a given set of requirements
- Define and use a dynamic template that satisfies a given set of requirements
- Define an Index Lifecycle Management policy for a time-series index
- Define an index template that creates a new data stream

#### Searching Data

- Write and execute a search query for terms and/or phrases in one or more fields of an index
- Write and execute a search query that is a Boolean combination of multiple queries and filters
- Write an asynchronous search
- Write and execute metric and bucket aggregations
- Write and execute aggregations that contain sub-aggregations
- Write and execute a query that searches across multiple clusters
- Write and execute a search that utilizes a runtime field

#### Developing Search Applications

- Highlight the search terms in the response of a query
- Sort the results of a query by a given set of requirements
- Implement pagination of the results of a search query
- Define and use index aliases
- Define and use a search template

#### Data Processing

- Define a mapping that satisfies a given set of requirements
- Define and use a custom analyzer that satisfies a given set of requirements
- Define and use multi-fields with different data types and/or analyzers
- Use the Reindex API and Update By Query API to reindex and/or update documents
- Define and use an ingest pipeline that satisfies a given set of requirements, including the use of Painless to modify documents
- Define runtime fields to retrieve custom values using Painless scripting

#### Cluster Management

- Diagnose shard issues and repair a cluster's health
- Backup and restore a cluster and/or specific indices
- Configure a snapshot to be searchable
- Configure a cluster for cross-cluster search
- Implement cross-cluster replication

## References

I extracted the information from the following resources:

- [Elasticsearch certified engineer preparation guide](https://raman-kasthuri.medium.com/elastic-search-certified-engineer-preparation-guide-b1f591e4026e)
- [Preparing for the Elastic Certified Engineer Exam - Get Elasticsearch Certified](https://youtu.be/9UpB-s_ZfNE?si=XhO9DjM2N6FkHtTV)
