{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "chuchu.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "chuchu.fullname" -}}
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
{{- define "chuchu.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "chuchu.labels" -}}
helm.sh/chart: {{ include "chuchu.chart" . }}
{{ include "chuchu.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "chuchu.selectorLabels" -}}
app.kubernetes.io/name: {{ include "chuchu.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "chuchu.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "chuchu.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}


{{- define "chuchu.thalapublicurl" -}}
https://{{- .Values.api.domain -}}/{{- .Values.customer -}}/{{- .Values.api.thalauri -}}/api/v1/
{{- end -}}


{{/*
Create the public UR for chuchu. Defaults to customer-name.edudoor.org, but user can override it by passing app_url.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "chuchu.public_app_url" -}}
{{- if .Values.app_url -}}
{{- .Values.app_url | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.edudoor.org
{{- end -}}
{{- end -}}

{{- define "samvadam.samvadampublicurl" -}}
https://{{- .Values.api.domain -}}
{{- end -}}
