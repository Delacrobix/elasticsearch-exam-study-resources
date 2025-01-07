# Aggregations

Here are some notes on most commons aggregations in Elasticsearch. So this is the most used I suggest you read about all of them in the official documentation.

| **Agg**                                                                                                                                       |**Type**| **Use**                                                              |
|-----------------------------------------------------------------------------------------------------------------------------------------------|--------|----------------------------------------------------------------------|
|[terms](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)                     |Bucket  |Retrieve one bucked per unique values.                                |
|[max](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)                        |Metrics |Return the maximum value of a numeric field.                          |
|[min](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)                        |Metrics |Return the minimum value of a numeric field.                          |
|[stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)                    |Metrics |Return the max, min, sum, count and avg of a numeric field.           |
|[histogram](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html)             |Bucket  |Can be used for group numeric fields by intervals.                    |
|[date_histogram](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html)    |Bucket  |                                                                      |
|[top_hits](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)              |Metrics |                                                                      |
|[percentil](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-aggregation.html)           |Metrics |Can extract specific percentiles. Also can be used to find the median.|
|[percentil_ranks](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html)|Metrics |                                                                      |
|[cardinality](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html)        |Metrics |Return the count of unique values.                                    |
|[sum](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-sum-aggregation.html)                        |Metrics |Sums up numeric fields.                                               |
