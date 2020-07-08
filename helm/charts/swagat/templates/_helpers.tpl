{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "swagat.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "swagat.fullname" -}}
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
{{- define "swagat.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Common labels
*/}}
{{- define "swagat.labels" -}}
helm.sh/chart: {{ include "swagat.chart" . }}
{{ include "swagat.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Selector labels
*/}}
{{- define "swagat.selectorLabels" -}}
app.kubernetes.io/name: {{ include "swagat.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Create the name of the service account to use
*/}}
{{- define "swagat.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "swagat.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{/*
Create the public UR for Thala Api. Defaults to thala.customer-name.doorward.org, but user can override it by passing thala_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "swagat.thalapublicurl" -}}
{{- if .Values.thala_domain -}}
{{- .Values.thala_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
thala.{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.org/api/v1/
{{- end -}}
{{- end -}}


{{/*
Create the public UR for swagat. Defaults to customer-name.doorward.org, but user can override it by passing welcomepage_domain.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "swagat.frontpage_website_name" -}}
{{- if .Values.welcomepage_domain -}}
{{- .Values.welcomepage_domain | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- .Values.customer | trunc 63 | trimSuffix "-" -}}.doorward.org
{{- end -}}
{{- end -}}
