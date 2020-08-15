{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "meeting.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "meeting.fullname" -}}
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
{{- define "meeting.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "meeting.labels" -}}
helm.sh/chart: {{ include "meeting.chart" . }}
{{ include "meeting.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "meeting.selectorLabels" -}}
app.kubernetes.io/name: {{ include "meeting.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "meeting.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "meeting.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}


{{/*
Create the public UR for Thala Api. Defaults to thala.customer-name.doorward.tech, but user can override it by passing thala_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "meeting.thalapublicurl" -}}
{{- if .Values.thala_domain -}}
{{- .Values.thala_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
thala.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.tech//{{- .Values.customer -}}/{{- .Values.api.thalauri -}}/api/v1/
{{- end -}}
{{- end -}}


{{/*
Create the public UR for meeting. Defaults to customer-name.doorward.tech, but user can override it by passing app_url.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "meeting.public_app_url" -}}
{{- if .Values.app_domain -}}
{{- .Values.app_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.tech
{{- end -}}
{{- end -}}


{{/*
Create the public UR for Samvadam. Defaults to samvadam.customer-name.doorward.tech, but user can override it by passing samvadam_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "samvadam.samvadampublicurl" -}}
{{- if .Values.samvadam_domain -}}
{{- .Values.samvadam_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
samvadam.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.tech
{{- end -}}
{{- end -}}
