import debug from 'debug';
import dotenv from 'dotenv';
import ldap from 'ldapjs';
import LdapAuth from 'ldapauth-fork';
import http from 'http';
import env from './config/environment';
import app from './app';
import models from './database/models';

global.models = models;

dotenv.config();
const logger = debug('log');
const server = http.createServer(app);

// create the ldap client
const ldapAuth = new LdapAuth({
  url: process.env.LDAP_URL,
  bindDN: 'cn=admin, dc=edudoor, dc=org',
  bindCredentials: 'password',
  searchBase: 'o=Andela,dc=edudoor,dc=org',
  searchFilter: '(cn={{username}})',
  reconnect: true,
});

ldapAuth.authenticate('moses', 'password', (err, user) => {
  console.log(err, user);
});

const ldapClient = ldap.createClient({
  url: process.env.LDAP_URL,
});

ldapClient.bind('cn=admin, dc=edudoor, dc=org', 'password', () => {
  ldapClient.add(
    'cn=gitaumoses4, o=Andela, dc=edudoor, dc=org',
    {
      cn: 'gitaumoses4',
      sn: 'Gitau',
      objectClass: ['organizationalPerson', 'person', 'top'],
      userPassword: 'password',
    },
    err => {
      console.log(err);
    }
  );
});

console.log(`Starting server on port ${env.PORT}`);

server.listen(env.PORT, '0.0.0.0', 511, () => {
  logger(`Find me on http://localhost:${env.PORT}`);
});
