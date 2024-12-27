# Painless Notes

Here you will find a collection of notes on Painless, the scripting language used in Elasticsearch. 

## How to call document fields

You can call documents fields in Painless using the following syntax:


### Using the `ctx` object for modifying documents

```java
ctx._source.field_name = x;
```

#### example:

```json

POST _scripts/example_script
{
  "script": {
    "lang": "painless",
    "source": """
      ctx._source.field = "new_value"; 
    """
  }
}
```


### Using the `doc` object for querying documents

```java
doc['field_name'].value
```

#### example:

```json
{
  "query": {
    "script_score": {
      "query": {
        "match_all": {}
      },
      "script": {
        "source": "doc['field_name'].value == 2"
      }
    }
  }
}
```