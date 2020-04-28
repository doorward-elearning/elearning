import { Op, Sequelize } from 'sequelize';
import models from '../database/models';

class OrganizationUtils {
  static async get(sequelize: Sequelize) {
    let organization: any;
    if (process.env.ORGANIZATION_NAME) {
      organization = sequelize.getQueryInterface().rawSelect("Organizations", {
        where: {
          name: {
            [Op.iLike]: process.env.ORGANIZATION_NAME
          }
        }
      }, );
      organization = await models.Organization.findOne({
        where: {
          name: {
            [Op.iLike]: process.env.ORGANIZATION_NAME,
          },
        },
      });
    }
    if (!organization) {
      organization = await models.Organization.create({
        name: process.env.ORGANIZATION_NAME,
        description: '',
        icon: process.env.ORGANIZATION_LOGO,
        link: process.env.ORGANIZATION_WEBSITE_LINK,
        darkThemeIcon: process.env.ORGANIZATION_LOGO_DARK_THEME,
      });
    }

    process.env.ORGANIZATION_ID = organization.id;
    return organization;
  }

  static async getId() {
    return process.env.ORGANIZATION_ID;
  }
}

export default OrganizationUtils;
