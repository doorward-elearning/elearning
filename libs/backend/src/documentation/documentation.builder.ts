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

  private scanPaths(paths: PathsObject): string {
    const endpoints = Object.keys(paths).reduce((acc, cur) => {
      return acc + this.scanPath(cur, paths[cur]);
    }, '');

    const bodies = Array.from(this.requestBody).join(',');
    const responses = Array.from(this.responseBody).join(',');

    return `
      ${bodies ? `import { ${bodies} } from '@doorward/common/dtos/body';` : ''}
      import ApiRequest from '@doorward/ui/services/apiRequest';
      ${responses ? `import { ${responses} } from '@doorward/common/dtos/response';` : ''}
      import DApiResponse from '@doorward/common/dtos/response/d.api.response';
      import { AxiosRequestConfig } from 'axios';
      
      const { GET, PUT, POST, DELETE } = ApiRequest;
    
      const DoorwardBackendApi = {
        ${endpoints}
      }
      
      export default DoorwardBackendApi;
    `;
  }

  private scanPath(path: string, pathItem: PathItemObject): string {
    let api = '';
    ['post', 'get', 'delete', 'put', 'patch']
      .filter((method) => pathItem[method])
      .map((method) => {
        const operationItem = pathItem[method] as OperationObject;

        let pathTitle = operationItem.operationId;
        const tokens = pathTitle.split('_');

        pathTitle = tokens.length === 2 ? tokens[1] : tokens[0];

        const Body = this.extractSchemaFromRef(
          (operationItem.requestBody as RequestBodyObject)?.content?.['application/json']?.schema?.['$ref']
        );

        const responseTypes = Object.keys(operationItem.responses);
        const Response = this.extractSchemaFromRef(
          (operationItem.responses?.[responseTypes[0]] as ResponseObject)?.content?.['application/json']?.schema?.[
            '$ref'
          ]
        );

        const Query = this.generateQueryParams(operationItem.parameters as ParameterObject[]);
        const Params = this.generatePathParams(path, operationItem.parameters as ParameterObject[]);

        if (Body) {
          this.requestBody.add(Body);
        }
        if (Response) {
          this.responseBody.add(Response);
        }

        api += `${pathTitle}: ${this.generateFunction(method, path, Params, Body, Response, Query)},\n`;
      });

    return api;
  }

  private generateFunction(
    method: string,
    path: string,
    Params: { params: string; path: string },
    Body?: string,
    Response?: string,
    query?: {
      optional: string;
      required: string;
      queryParams: string;
    }
  ) {
    const { params, path: newPath } = Params;
    switch (method) {
      case 'get':
      case 'delete':
        return `(${params}${query?.required}${query?.optional}config?: AxiosRequestConfig): Promise<${
          Response || 'DApiResponse'
        }> => {
              return ${method.toUpperCase()}(\`${newPath}\`, ${query?.queryParams}, config);
          }
        `;
      case 'post':
      case 'put':
      case 'patch':
        return `(${params}${query?.required}${(Body ? 'body: ' + Body : 'undefined') + ','}${
          query?.optional
        }config?: AxiosRequestConfig): Promise<${Response || 'DApiResponse'}> => {
              return ${method.toUpperCase()}(\`${newPath}\`,${Body ? 'body' : 'undefined'}, ${
          query?.queryParams
        }, config);
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

    return { params, path: path.replace('{', '${') };
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
      optional: optionalParams.length ? 'query: {' + optionalParams.join(',') + '},' : '',
      required: requiredParams.join(',') + (requiredParams.length ? ',' : ''),
      queryParams:
        '{' +
        requiredParams.join(',') +
        (requiredParams.length ? ',' : '') +
        (optionalParams.length ? '...query' : '') +
        '}',
    };
  }

  private extractSchemaFromRef(ref: string | undefined) {
    if (ref) {
      const tokens = ref.split('/');
      return tokens[tokens.length - 1];
    }
  }
}
