import OrganizationEntity from '@doorward/common/entities/organization.entity';

export const organizationDetectorMiddleware = (organizations: Record<string, OrganizationEntity>) => {
  return (request: any, res: any, next: () => void): any => {
    const hostUrl = request.protocol + '://' + request.get('host');
    const origin = (request.headers.origin || hostUrl || request.query?.origin || '').trim();

    let currentOrganization = null;

    Object.values(organizations).forEach((organization) => {
      if (organization.link.trim().toLowerCase() === origin) {
        currentOrganization = organization;
      }
    });

    if (currentOrganization === null) {
      currentOrganization = organizations[process.env.DEFAULT_ORGANIZATION_ID];
    }

    request.organization = currentOrganization;

    next();
  };
};
