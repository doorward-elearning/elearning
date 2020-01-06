**Setup you Laptop:**

Run below command in your laptop:
`gcloud container clusters get-credentials standard-cluster-10 --zone us-east1-b --project doorward`

go to the folder "deploy" in develop branch. Make necessary modification as needed and run kubectl apply command

`kubectl apply -f yaml_file_path`




**1) Storageclass**:  A storage class is created prior to claim, which contains the settings of the volume that pod mount with.

I have created a storageclass "databases" in the file db-sc.yml

**2) PVC**: A PersistentVolumeClaim (PVC) is a request for storage by a pod.

I have created 2 PVC - edudoor-data and openolat-data. Files are pvc-nodedb.yml and pvc-olatdb.yml respectively. When a claim is made, kubernetes will look for an existing volume (or create new one ).

**3) Claim by POD**: This is the requst by pod to mount a volume created by pvc into the pod. This is how pod mount a disk (created by PVC edudoor-data) to /var/lib/postgresql/data folder. Look into the files edudoor-database.yaml and openolat-database.yaml for more details.

        volumeMounts:
        - mountPath: /var/lib/postgresql/data
          name: edudoor-data-postgresql

      volumes:
      - name: edudoor-data-postgresql
        persistentVolumeClaim:
          claimName: edudoor-data


**4) Persistant Disks**: To view the disks in GCP console, look under "Disks"

