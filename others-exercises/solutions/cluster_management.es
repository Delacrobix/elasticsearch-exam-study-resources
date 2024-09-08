/**
*
* EXERSICE 1
*
**/

POST important_data/_doc
{
  "important": "data"
}

// Looking for the path.repo 
GET /_nodes/settings?filter_path=**.path.repo

PUT _snapshot/my_backup_repo
{
  "type": "fs",
  "settings": {
    "location": "/usr/share/elasticsearch/\"/mnt/backup\"", // This is the path.repo
    "compress": true
  }
}

PUT _snapshot/my_backup_repo/cluster_snapshot_1
{
  "indices": "*"
}

GET _snapshot/my_backup_repo/cluster_snapshot_1

DELETE important_data

POST _snapshot/my_backup_repo/cluster_snapshot_1/_restore
{
  "indices": "important_data"
}

GET _cluster/health/important_data

// Setting the cluster health to green
PUT important_data/_settings
{
  "number_of_replicas": 0
}


/**
*
* EXERSICE 2
*
**/

// In both clusters: 

GET _cluster/health

// Into es-east cluster

PUT _cluster/settings
{
  "persistent": {
    "cluster": {
      "remote": {
        "es-east": {
          "seeds": [
            "es-east:9300"
          ]
        }
      }
    }
  }
}

GET _remote/info
