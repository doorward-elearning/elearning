import ldapjs from 'ldapjs';

class LdapClient {
  static async add(name, entry) {
    return new Promise((resolve, reject) => {
      ldapClient.add(name, entry, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async bindClient() {
    return new Promise((resolve, reject) => {
      const client = ldapjs.createClient({
        url: process.env.LDAP_URL,
      });
      client.bind(
        `cn=${process.env.LDAP_ADMIN}, ${process.env.LDAP_BASE}`,
        process.env.LDAP_ADMIN_PASSWORD,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(client);
          }
        }
      );
    });
  }
}

export default LdapClient;
