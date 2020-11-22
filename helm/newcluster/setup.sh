kubectl apply -f storageclass-default.yaml
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.4/cert-manager.yaml
sleep 100
kubectl apply -f issuer.yaml
kubectl apply -f efk.yaml
helm install nginx-ingress ../charts/controllers/nginx-ingress
helm install grafana ../charts/controllers/grafana
helm install prometheus ../charts/controllers/prometheus

for i in 1 2 3 4 5 6 7 8 9 10;
do
  kubectl get pods | egrep 'es-cluster|fluentd|grafana|kibana|nginx-ingress-controller|nginx-ingress-default|prometheus-alertmanager|prometheus-kube-state-metrics|prometheus-node-exporter|prometheus-pushgateway|prometheus-server' | grep -v Running
  if [ $? -eq 0 ]; then
    sleep 120
  else
    echo "Cluster is Ready"
    exit
  fi
done

echo "Grafana admin password:"
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
