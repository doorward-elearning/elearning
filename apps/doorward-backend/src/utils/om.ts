/**
 * This function is used to replace organization model parameters.
 * @param str
 */
import OrganizationModelsTransformInterceptor from '../interceptors/organization.models.transform.interceptor';

function om(str: TemplateStringsArray | string) {
  return OrganizationModelsTransformInterceptor.performReplacement(typeof str === 'string' ? str : str.raw.join(' '));
}

export default om;
