{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "chat.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "chat.fullname" -}}
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
{{- define "chat.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "chat.labels" -}}
helm.sh/chart: {{ include "chat.chart" . }}
{{ include "chat.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "chat.selectorLabels" -}}
app.kubernetes.io/name: {{ include "chat.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "chat.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "chat.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}


{{/*
Define chatDB URL
*/}}
{{- define "chat.chatdburl" -}}
postgres://{{- .Values.chatdbuser -}}:{{- .Values.chatdbpassword -}}@{{- .Values.customer -}}-{{- .Values.chatdbhostpostfix -}}:{{- .Values.chatdbport -}}/{{- .Values.chatdbname -}}
{{- end -}}


{{/*
Public URL for chat Api. Defaults to chat.customer-name.doorward.tech, but user can override it by passing chat_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "chat.chatpublicurl" -}}
{{- if .Values.chat_domain -}}
{{- .Values.chat_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
chat.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.tech/api/v1/
{{- end -}}
{{- end -}}


{{/*
Create the public UR for Thala Api. Defaults to thala.customer-name.doorward.tech, but user can override it by passing thala_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "chat.thalapublicurl" -}}
{{- if .Values.thala_domain -}}
{{- .Values.thala_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
thala.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.tech//{{- .Values.customer -}}/{{- .Values.api.thalauri -}}/api/v1/
{{- end -}}
{{- end -}}
