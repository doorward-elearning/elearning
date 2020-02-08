import models from '../../database/models';

export const validateCreateOrganization = req => {
  req.checkBody('name', 'The name of the organization is required').notEmpty();
};

export const validateOrganizationExists = async req => {
  const { organizationId } = req.params;

  const organization = await models.Organization.findByPk(organizationId);

  if (!organization) {
    return [404, undefined, 'The organization does not exist'];
  }
};
