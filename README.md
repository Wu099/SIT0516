#### Ready the containerized application code
```groovy
In the directory test_node
```
#### Step 1: Deploy prometheus-operator
```groovy
a. deploy prometheus-operator from github repo

LATEST=$(curl -s https://api.github.com/repos/prometheus-operator/prometheus-operator/releases/latest | jq -cr .tag_name)
curl -sL https://github.com/prometheus-operator/prometheus-operator/releases/download/${LATEST}/bundle.yaml | kubectl create -f -

b.check status

kubectl wait --for=condition=Ready pods -l  app.kubernetes.io/name=prometheus-operator -n default
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36189502/1715845944800-7e806ea3-2c79-4438-b72e-d7ddbecaee26.png#averageHue=%232f2b2a&clientId=ubedfaf4f-1015-4&from=paste&height=254&id=LY6bm&originHeight=508&originWidth=2842&originalType=binary&ratio=2&rotation=0&showTitle=false&size=228909&status=done&style=none&taskId=uf7bc9f4f-c093-4d12-9e35-80b4b03ca6a&title=&width=1421)

#### Step 2: Install the CRD required by the operator AND example application
```groovy
kubectl apply -f prome.yaml
deployment.apps/example-app created
service/example-app created
servicemonitor.monitoring.coreos.com/example-app created
serviceaccount/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
prometheus.monitoring.coreos.com/prometheus created
service/prometheus created
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36189502/1715846148840-5f9df404-9d57-4f41-99bc-d5f7d002ad6c.png#averageHue=%2334302f&clientId=ubedfaf4f-1015-4&from=paste&height=81&id=kpUnU&originHeight=162&originWidth=2832&originalType=binary&ratio=2&rotation=0&showTitle=false&size=105490&status=done&style=none&taskId=u0c9b4715-32ef-4af8-a4d3-02c0bbabf4f&title=&width=1416)
##### ps: servicemonitor.monitoring.coreos.com/example-app is used for the configuration of prometheus collection indicators.

#### How to access prometheus：
```groovy
1.Port forwarding needs to be configured in GKE

gcloud container clusters get-credentials autopilot-cluster-1 --region us-central1 --project innate-ally-423412-h1  && kubectl port-forward $(kubectl get pod --selector="prometheus=prometheus" --output jsonpath='{.items[0].metadata.name}') 8080:web
2.GKE will provide an address for you to access
https://8080-cs-b90cb8d4-8cc0-491b-b213-2b948585af77.cs-asia-southeast1-yelo.cloudshell.dev/graph
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36189502/1715846472266-4b15734f-be19-486b-a002-20e47be3fb39.png#averageHue=%232a2a2a&clientId=ubedfaf4f-1015-4&from=paste&height=119&id=eYjUt&originHeight=238&originWidth=2900&originalType=binary&ratio=2&rotation=0&showTitle=false&size=103354&status=done&style=none&taskId=uabe181ae-a90d-44da-a562-973d9cee80f&title=&width=1450)

#### View the collection indicator service just deployed
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36189502/1715846642340-b95f462b-3b21-463f-8bd2-b04f397fdf90.png#averageHue=%23ebbb43&clientId=ubedfaf4f-1015-4&from=paste&height=506&id=u41aaa56b&originHeight=1012&originWidth=2894&originalType=binary&ratio=2&rotation=0&showTitle=false&size=242886&status=done&style=none&taskId=u24dc3fc1-c707-4fe8-b482-427c5f2fc44&title=&width=1447)
configuration 
```groovy
global:
  scrape_interval: 30s
  scrape_timeout: 10s
  scrape_protocols:
  - OpenMetricsText1.0.0
  - OpenMetricsText0.0.1
  - PrometheusText0.0.4
  evaluation_interval: 30s
  external_labels:
    prometheus: default/prometheus
    prometheus_replica: prometheus-prometheus-0
scrape_configs:
- job_name: serviceMonitor/default/example-app/0
  honor_timestamps: true
  track_timestamps_staleness: false
  scrape_interval: 30s
  scrape_timeout: 10s
  scrape_protocols:
  - OpenMetricsText1.0.0
  - OpenMetricsText0.0.1
  - PrometheusText0.0.4
  metrics_path: /metrics
  scheme: http
  enable_compression: true
  follow_redirects: true
  enable_http2: true
  relabel_configs:
  - source_labels: [job]
    separator: ;
    regex: (.*)
    target_label: __tmp_prometheus_job_name
    replacement: $1
    action: replace
  - source_labels: [__meta_kubernetes_service_label_app, __meta_kubernetes_service_labelpresent_app]
    separator: ;
    regex: (example-app);true
    replacement: $1
    action: keep
  - source_labels: [__meta_kubernetes_endpoint_port_name]
    separator: ;
    regex: web
    replacement: $1
    action: keep
  - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
    separator: ;
    regex: Node;(.*)
    target_label: node
    replacement: ${1}
    action: replace
  - source_labels: [__meta_kubernetes_endpoint_address_target_kind, __meta_kubernetes_endpoint_address_target_name]
    separator: ;
    regex: Pod;(.*)
    target_label: pod
    replacement: ${1}
    action: replace
  - source_labels: [__meta_kubernetes_namespace]
    separator: ;
    regex: (.*)
    target_label: namespace
    replacement: $1
    action: replace
  - source_labels: [__meta_kubernetes_service_name]
    separator: ;
    regex: (.*)
    target_label: service
    replacement: $1
    action: replace
  - source_labels: [__meta_kubernetes_pod_name]
    separator: ;
    regex: (.*)
    target_label: pod
    replacement: $1
    action: replace
  - source_labels: [__meta_kubernetes_pod_container_name]
    separator: ;
    regex: (.*)
    target_label: container
    replacement: $1
    action: replace
  - source_labels: [__meta_kubernetes_pod_phase]
    separator: ;
    regex: (Failed|Succeeded)
    replacement: $1
    action: drop
  - source_labels: [__meta_kubernetes_service_name]
    separator: ;
    regex: (.*)
    target_label: job
    replacement: ${1}
    action: replace
  - separator: ;
    regex: (.*)
    target_label: endpoint
    replacement: web
    action: replace
  - source_labels: [__address__]
    separator: ;
    regex: (.*)
    modulus: 1
    target_label: __tmp_hash
    replacement: $1
    action: hashmod
  - source_labels: [__tmp_hash]
    separator: ;
    regex: "0"
    replacement: $1
    action: keep
  kubernetes_sd_configs:
  - role: endpoints
    kubeconfig_file: ""
    follow_redirects: true
    enable_http2: true
    namespaces:
      own_namespace: false
      names:
      - default
```

#### The monitoring panel of one of the indicators is as follows
![image.png](https://cdn.nlark.com/yuque/0/2024/png/36189502/1715846852561-bbf0bb08-721a-4edb-83cd-46753223346a.png#averageHue=%23fcfcfc&clientId=ubedfaf4f-1015-4&from=paste&height=852&id=uce40a85b&originHeight=1704&originWidth=3002&originalType=binary&ratio=2&rotation=0&showTitle=false&size=314379&status=done&style=none&taskId=u183fa0c4-20cd-4e4f-8392-9cbd2e56f57&title=&width=1501)
