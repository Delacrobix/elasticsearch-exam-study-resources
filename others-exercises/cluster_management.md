# Exercise 1: Backup and Restore a Cluster and/or Specific Indices

## Objective

Learn how to perform backup (snapshot) and restore operations in Elasticsearch to safeguard your data at the cluster or index level.

## Instructions

### 1. Set Up a Snapshot Repository

For this step you must to have the `path.repo` setting configured in the `elasticsearch.yml` file. This setting allows you to specify the location of the snapshot repository.

- Create an index named `important_data` with some sample data.
- Create a snapshot repository named `my_backup_repo`.
- Use the file system as the storage type, use the path that you have configured in the `elasticsearch.yml` file.

### 2. Take a Snapshot of the Entire Cluster

- Create a snapshot named `cluster_snapshot_1` that backs up all indices in the cluster.

### 3. Verify the Snapshot

- Confirm that the snapshot was successfully created by checking the status of the repository.

### 4. Delete an Index

- Simulate a data loss scenario by deleting the index named `important_data`.

### 5. Restore the Deleted Index from the Snapshot

- Restore the `important_data` index from the `cluster_snapshot_1`.

### 6. Verify the Restoration

- Confirm that the `important_data` index has been successfully restored by checking its existence and health status.

# Exercise 2: Configure a Cluster for Cross-Cluster Search

## Objective

Learn how to configure Elasticsearch clusters for cross-cluster search by setting up the necessary connections between a local and a remote cluster.

## Instructions

### 1. Set Up Two Elasticsearch Clusters:

- Use the provided docker-compose file to set up two Elasticsearch clusters: [2_es-node 2_kibana](../docker-environments/2es-2kb.yml)
- Ensure you have two running Elasticsearch clusters:
  - **Local cluster:** `es-west` (listening on `localhost:9201`)
  - **Remote cluster:** `es-east` (listening on `localhost:9202`)

### 2. Verify Cluster Health:

- Check the health status of both clusters to ensure they are running correctly.

### 3. Configure the Local Cluster to Connect to the Remote Cluster:

- From the local cluster `es-west`, configure a connection to the remote cluster `es-east`.

### 4. Verify the Remote Cluster Connection:

Verify that the local cluster `es-west` is correctly connected to the remote cluster `es-east`.
