import LdapClient from './client';

const USERS_DN = name => `cn=${name}, ${process.env.LDAP_BASE}`;

class LdapUtils {
  static async createUser(user, password) {
    return LdapClient.add(USERS_DN(user.username), {
      objectClass: ['organizationPerson', 'person', 'top'],
      sn: user.lastName || user.username,
      cn: user.username,
      userPassword: password,
    });
  }
}

export default LdapUtils;
