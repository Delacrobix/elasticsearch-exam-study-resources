
// Standard analyzer
POST _analyze
{
  "analyzer": "standard",
  "text": "Hola, mi nombre es Gustavo ;)"
}

//Analyzer by language
POST _analyze
{
  "analyzer": "spanish",
  "text": "Hola, mi nombre es Gustavo ;)"
}

// ? --- CHAR FILTERS ---

POST /_analyze
{
  "tokenizer": "keyword", // This will not tokenize the text
  "char_filter": [
    {
    "type": "mapping",
    "mappings": [";) => :blink:"] //This will replace ;) with :blink:
    }
  ],
  "text": "Hello ;)"
}

POST /_analyze
{
  "tokenizer": "keyword",
  "char_filter": ["html_strip"], //This will remove html tags
  "text": "<p>Hello</p>"
}

// ? --- TOKENIZERS ---

// Oriented to analized text: standard, english, spanish, etc
POST _analyze
{
  "analyzer": "standard",
  "text": "Hola, soy Gustavo"
}

// Oriented to incomplete words: edge-ngram
POST /_analyze
{
  "tokenizer": "edge_ngram",
  "text": "Hola, soy Gustavo"
}

//Oriented to structured text: emails, urls
POST /_analyze
{
  "tokenizer": "uax_url_email",
  "text": "Hola, mi correo es correodeprueba@gmail.com"
}

// ? --- TOKEN FILTERS ---

// synonym_graph
POST /_analyze
{
  "tokenizer": "standard",
  "filter": [
    {
      "type": "synonym_graph",
      "synonyms": [ //This will replace the words in the list
        "gustavo => gus"
      ]
    },
    {
      "type": "stop",
      "stopwords": [ //This will remove the words in the list
        "gustavo",
        "es"
      ]
    }
  ],
  "text": "gustavo es el profesor"
}

//The order of the filters is important
POST /_analyze
{
  "tokenizer": "standard",
  "filter": [
    {
      "type": "stop",
      "stopwords": [
        "gustavo",
        "es"
      ]
    },
    {
      "type": "synonym_graph",
      "synonyms": [
        "gustavo => gus"
      ],
      "lenient": true
    }
  ],
  "text": "gustavo es el profesor"
}