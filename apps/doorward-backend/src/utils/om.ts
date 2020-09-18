/**
 * This function is used to replace organization model parameters.
 * @param str
 */
import OrganizationModelsTransformInterceptor from '../interceptors/organization.models.transform.interceptor';

function om(str: string) {
  return OrganizationModelsTransformInterceptor.performReplacement(str);
}

export default om;
