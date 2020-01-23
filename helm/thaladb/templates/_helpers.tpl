{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.name" -}}
=======
{{- define "namespaces.name" -}}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.fullname" -}}
=======
{{- define "namespaces.fullname" -}}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.chart" -}}
=======
{{- define "namespaces.chart" -}}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.labels" -}}
helm.sh/chart: {{ include "thaladb.chart" . }}
{{ include "thaladb.selectorLabels" . }}
=======
{{- define "namespaces.labels" -}}
helm.sh/chart: {{ include "namespaces.chart" . }}
{{ include "namespaces.selectorLabels" . }}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.selectorLabels" -}}
app.kubernetes.io/name: {{ include "thaladb.name" . }}
=======
{{- define "namespaces.selectorLabels" -}}
app.kubernetes.io/name: {{ include "namespaces.name" . }}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
<<<<<<< HEAD:helm/thaladb/templates/_helpers.tpl
{{- define "thaladb.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "thaladb.fullname" .) .Values.serviceAccount.name }}
=======
{{- define "namespaces.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "namespaces.fullname" .) .Values.serviceAccount.name }}
>>>>>>> b89136d21e3ee69f3b7cd5cd7ba8a810cd44c212:helm/namespaces/templates/_helpers.tpl
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}


{{/*
Create the name of the Config Map to use
*/}}
{{- define "thaladb.configmapurl" -}}
{{- .Values.customer -}}-{{- .Values.thaladbconfigmappostfix -}}
{{- end -}}
