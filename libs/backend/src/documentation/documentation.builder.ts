import { INestApplication } from '@nestjs/common';
import { SwaggerScanner } from '@nestjs/swagger/dist/swagger-scanner';
import {
  OperationObject,
  ParameterObject,
  PathItemObject,
  PathsObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export default class DocumentationBuilder {
  requestBody = new Set();
  responseBody = new Set();
  constructor() {}

  public scanApplication(app: INestApplication, fileName: string, serviceName: string) {
    if (process.env.NODE_ENV === 'development') {
      const beautify = require('js-beautify').js;
      const fs = require('fs');
      const chalk = require('chalk').default;

      const result = new SwaggerScanner().scanApplication(app, {
        deepScanRoutes: true,
        ignoreGlobalPrefix: true,
      });

      const documentation = this.scanPaths(result.paths);
      const directory = './libs/common/src/apis/' + fileName;
      // eslint-disable-next-line @typescript-eslint/camelcase
      fs.writeFileSync(directory, beautify(documentation, { indent_size: 2 }));

      console.log(chalk.cyan('[' + serviceName + '] - Api Endpoints generated. ') + chalk.yellow(directory));
    }
  }

  private generatePathsByController(paths: PathsObject) {
    const newPaths: Record<string, PathsObject> = {};

    Object.keys(paths).forEach((path) => {
      const pathItem = paths[path];

      const methods = Object.keys(pathItem);

      if (methods.length) {
        const tags = pathItem[methods[0]]?.tags;

        if (tags?.length) {
          const controller = tags[0];

          newPaths[controller] = {
            ...(newPaths[controller] || {}),
            [path]: pathItem,
          };
        } else {
          throw new Error(path + ' does not have an ApiTag');
        }
      }
    });

    return newPaths;
  }

  private generateEndpoints(paths: PathsObject) {
    return Object.keys(paths).reduce((acc, cur) => {
      return acc + this.scanPath(cur, paths[cur]);
    }, '');
  }

  private scanPaths(paths: PathsObject): string {
    const pathsByController = this.generatePathsByController(paths);

    const endpoints = Object.keys(pathsByController)
      .map((controller) => {
        const pathToScan = pathsByController[controller];
        return `"${controller}":  {${this.generateEndpoints(pathToScan)}}`;
      })
      .sort()
      .join(',');

    const bodies = Array.from(this.requestBody).join(',');
    const responses = Array.from(this.responseBody)
      .filter((response) => response !== 'DApiResponse')
      .join(',');

    return `
      ${bodies ? `import { ${bodies} } from '@doorward/common/dtos/body';` : ''}
      import ApiRequest from '@doorward/common/net/apiRequest';
      ${responses ? `import { ${responses} } from '@doorward/common/dtos/response';` : ''}
      import DApiResponse from '@doorward/common/dtos/response/base.response';
      import handleApiError from '@doorward/common/net/handleApiError';
      import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
      
      const { GET, PUT, POST, DELETE } = ApiRequest;
    
      const DoorwardBackendApi = (defaultConfig?: () => AxiosRequestConfig) => ({
        ${endpoints}
      })
      
      export default DoorwardBackendApi;
    `;
  }

  private scanPath(path: string, pathItem: PathItemObject): string {
    return ['post', 'get', 'delete', 'put', 'patch']
      .filter((method) => pathItem[method])
      .map((method) => {
        const operationItem = pathItem[method] as OperationObject;

        let pathTitle = operationItem.operationId;
        const tokens = pathTitle.split('_');

        const tags = operationItem.tags;

        pathTitle = tokens.length === 2 ? tokens[1] : tokens[0];

        const body = this.extractSchema(
          (operationItem.requestBody as RequestBodyObject)?.content?.['application/json']?.schema as SchemaObject
        );

        const responseTypes = Object.keys(operationItem.responses);
        const response = this.extractSchema(
          (operationItem.responses?.[responseTypes[0]] as ResponseObject)?.content?.['application/json']
            ?.schema as SchemaObject
        );

        const Query = this.generateQueryParams(operationItem.parameters as ParameterObject[]);
        const Params = this.generatePathParams(path, operationItem.parameters as ParameterObject[]);

        body.forEach((b) => this.requestBody.add(b));
        response.forEach((r) => this.responseBody.add(r));

        return `${pathTitle}: ${this.generateFunction(method, path, Params, body, response, tags, Query)},\n`;
      })
      .sort()
      .join('');
  }

  private generateFunction(
    method: string,
    path: string,
    Params: { params: string; path: string },
    body: Array<string>,
    response: Array<string>,
    tags: Array<string>,
    query?: {
      optional: string;
      required: string;
      queryParams: string;
    }
  ) {
    if (tags.includes('upload-file')) {
      return this.createLocalUploadHandler(path, true);
    } else if (tags.includes('upload-multiple-files')) {
      return this.createLocalUploadHandler(path, false);
    }
    const { params, path: newPath } = Params;
    const Body = body.join(' | ');
    const Response = response.join(' | ');
    switch (method) {
      case 'get':
      case 'delete':
        return `(${params}${query?.required}${query?.optional}config?: AxiosRequestConfig): Promise<AxiosResponse<${
          Response || 'DApiResponse'
        }>> => {
              return ${method.toUpperCase()}(\`${newPath}\`, ${
          query?.queryParams
        }, { ...(config || {}), ...(defaultConfig && defaultConfig()) } );
          }
        `;
      case 'post':
      case 'put':
      case 'patch':
        return `(${params}${query?.required}${(Body ? 'body: ' + Body : 'undefined') + ','}${
          query?.optional
        }config?: AxiosRequestConfig): Promise<AxiosResponse<${Response || 'DApiResponse'}>> => {
              return ${method.toUpperCase()}(\`${newPath}\`,${Body ? 'body' : 'undefined'}, ${
          query?.queryParams
        }, {...(config || {}), ...(defaultConfig && defaultConfig()) } );
          }
        `;
      default:
        return null;
    }
  }

  private generatePathParams(path: string, parameters: ParameterObject[]) {
    let params = parameters
      .filter((param) => param.in === 'path')
      .map((param) => {
        return `${param.name}${param.required ? '' : '?'}: ${(param.schema as SchemaObject)?.type}`;
      })
      .join(',');
    if (params) {
      params = params + ',';
    }

    return { params, path: path.replace(/{/g, '${') };
  }

  private generateQueryParams(parameters: ParameterObject[]) {
    const optionalParams = [];
    const requiredParams = [];
    const allParams = [];

    parameters
      .filter((param) => param.in === 'query')
      .forEach((param) => {
        if (param.required) {
          requiredParams.push(param.name + ': ' + ((param.schema as SchemaObject).type || 'string'));
        } else {
          optionalParams.push(param.name + '?: ' + ((param.schema as SchemaObject).type || 'string'));
        }
        allParams.push(param.name);
      });

    return {
      optional: optionalParams.length ? 'query?: {' + optionalParams.join(',') + '},' : '',
      required: requiredParams.join(',') + (requiredParams.length ? ',' : ''),
      queryParams:
        '{' +
        requiredParams.map((param) => param.split(':')[0].replace(/\?$/, '')).join(',') +
        (requiredParams.length ? ',' : '') +
        (optionalParams.length ? '...(query || {})' : '') +
        '}',
    };
  }

  private extractSchema(schema: SchemaObject) {
    let result = [];
    if (schema) {
      if (schema.anyOf) {
        result = schema.anyOf.map((sc) => {
          return this.extractSchemaFromRef(sc['$ref']);
        });
      } else if (schema['$ref']) {
        result = [this.extractSchemaFromRef(schema['$ref'])];
      }
    }
    return result;
  }

  private extractSchemaFromRef(ref: string | undefined) {
    if (ref) {
      const tokens = ref.split('/');
      return tokens[tokens.length - 1];
    }
  }

  private createLocalUploadHandler(path: string, singleFile: boolean): string {
    return `async (
      ${singleFile ? 'file: Blob' : 'files: Array<Blob>'},
      onUploadProgress?: (percentage: number) => void,
      cancelHandler?: (cancelFunction: () => void) => void
    ): Promise<AxiosResponse<${singleFile ? 'FileResponse' : 'FilesResponse'}>> => {
      const formData = new FormData();
      
      ${
        singleFile
          ? `formData.append('file', file); `
          : `files.forEach((file) => {
          formData.append('files', file);
        }); `
      }
      
      let data = null;
      
      const result = await POST("${path}", formData, null, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onUploadProgress) {
            onUploadProgress(percentage);
          }
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelHandler(c);
        }),
      });
      
      return result;
    }`;
  }
}
