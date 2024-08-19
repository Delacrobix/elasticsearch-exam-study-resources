## The following exercises was extracted from the YouTube video: [Preparing for the Elastic Certified Engineer Exam - Get Elasticsearch Certified](https://www.youtube.com/watch?v=9UpB-s_ZfNE&t=1579s)

### NAME: Task 1

DESCRIPTION: Write a single search on the `stock-prices` index on `cluster1` that satisfies the following requirements:

- Returns the stock with the highest daily volume of the month.
- returns 0 documents.

One document of the `stock-prices` index looks like this:

```json
{
  "_index": "stock-prices",
  "_type": "_doc",
  "_id": "1",
  "_score": 1.0,
  "_source": {
    "low_price": 24.264,
    "high_price": 24.73,
    "@timestamp": "2020-01-01T00:00:00.000Z",
    "opening_price": 24.4,
    "volume": 28031,
    "closing_price": 24.52,
    "symbol": "ADSK"
  }
}
```

### NAME: Task 3

DESCRIPTION: Define a new data stream on `cluster1` that satisfies the following requirements:

- the index pattern is `logs-my-app-production`
- the corresponding index template is named `task3`
- the data is hot for 3 minutes, then immediately rolls over warm.
- the data is warm for 5 minutes, then rolls over cold.
- 10 minutes after rolling over, the data is deleted.

NOTE: This exercise is easier to resolve using the Kibana UI but you can to use Elasticsearch API to resolve it.

# Solutions

You can find the solution to these exercises in the file [elastic_youtube_channel](./solutions/elastic_youtube_channel.es).
