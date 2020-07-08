{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "samvadam.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "samvadam.fullname" -}}
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
{{- define "samvadam.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "samvadam.labels" -}}
helm.sh/chart: {{ include "samvadam.chart" . }}
{{ include "samvadam.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "samvadam.selectorLabels" -}}
app.kubernetes.io/name: {{ include "samvadam.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "samvadam.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "samvadam.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{- define "samvadam.contextpath" -}}
/{{ .Values.customer -}}/{{ .Chart.Name }}
{{- end -}}

{{/*
Create the public UR for Samvadam. Defaults to samvadam.customer-name.doorward.org, but user can override it by passing samvadam_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "samvadam.samvadampublicurl" -}}
{{- if .Values.samvadam_domain -}}
{{- .Values.samvadam_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
samvadam.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.org
{{- end -}}
{{- end -}}

{{- define "samvadam.samvadamwebhookendpoint" -}}
http://{{- .Values.customer -}}-thala/api/v1/meetingRooms/webhook
{{- end -}}
