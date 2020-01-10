# HELM

A helm chart needs to be created for every applications such as "openolat, openolatdb, openvodu, rest-api, rest-apidb, frontend" etc

### Create a new helm Chart:

`helm create chart_name`

**PS**: chart_name is same as our application name. This is VERY important and same name will be updated in Charts.yml that get generated.


### Chart file structure:

"helm create" command will create a folder "chart_name" which contains following files.

**Chart.yml** file: Contains metadata about the Chart. Make sure Chart.yml file has 2 variables name (name of the chart/application) and appVersion (this will be the TAG of docker image). Later we will use these 2 variables a lot inside our templates to generate yaml files.
**values.yml** file: Contains custom variables we want to use in templates, such as image repository, service port, container port, service type, replica count etc.
**templates folder**: This mainly contains
    1) all yaml file templates. When you install/upgrade a helm chart (helm install chart_name), all yaml files in this folder get updated with correct values (from Chart.yml, values.yml or any custom value you passed at run time using --set option) and deployed into GCP.
    2) helm helper templates. Filename end with .tpl (Small templates which you want to include inside other yaml files)


### Important Points:
- When creating templates, use the default files which "helm create" command generate and edit as needed (Don't try creating template from scratch, its complex and we may miss few things)
- Make sure you updated the appVersion after creating a chart pointing to the image tag. Image repository can be defined in values.yaml
- Do not forget to add namespace under metadata of all yaml files (it will be missing by default)
- If its a service yaml, make sure service port, targetport, and servicetype are defined (ClusterIP for openolat, openolatdb, node_db. LoadBalancer for frontend, node_backend and openvidu).
- Set the values serviceAccount.create to False in all Charts. We dont use them.
- "helm create chart_name" command few sample yamls in templates folder. But if you are creating a different object such as "ConfigMap, StorageClass, PVC" etc, you can download existing yaml files from gcp and make templates. Make sure all best Practices are following in that case (namespace, name, metadata, labels, etc).



### Install a helm Chart (Deploy chart to kubernetes/GCP Kubernetes):


`helm install Release_name Chart_name --set customer=customer_name`

**Release_name**: Helm release name. This value is VERY important as our yaml files use this value (Deployment name, Service Name and many other important values points to Release_name). You can specify customername-chartname.
**Chart_name**: Which Chart to deploy. Remember install command will deploy all yaml files in templates folder.
**customer_name**: name of the customer whom you are deploying it for (eg: makonis)


### Upgrade a helm Chart (Change existing charts):

`helm upgrade Release_name Chart_name --set customer=customer_name`



### Upgrade or Install in one commandUpgrade or Install in one command

`helm upgrade --install Release_name Chart_name --set customer=customer_name`

"helm upgrade --install" command will try to upgrade a Release. But if the Release is not found, it will create it.


### List Releases:

`helm list`



### Helm Important Tutorials:

Quick Introduction video https://matthewpalmer.net/kubernetes-app-developer/articles/helm-kubernetes-video-tutorial.html
https://helm.sh/docs/intro/quickstart/
All Links under “Best Practices” => https://helm.sh/docs/topics/
https://helm.sh/docs/howto/charts_tips_and_tricks/

https://helm.sh/docs/topics/charts/
Links under "Chart Template Guide" https://helm.sh/docs/
