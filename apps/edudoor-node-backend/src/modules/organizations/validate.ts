export const validateCreateOrganization = req => {
  req.checkBody('name', 'The name of the organization is required').notEmpty();
};
