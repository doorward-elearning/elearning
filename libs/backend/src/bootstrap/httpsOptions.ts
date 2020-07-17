import path from 'path';
import fs from 'fs';

const sslDirectory = path.join(__dirname, '../../../ssl');

const keyFile = fs.readFileSync(path.join(sslDirectory, 'certificate.key'));
const certFile = fs.readFileSync(path.join(sslDirectory, 'certificate.crt'));

export default { key: keyFile, cert: certFile, rootCertificate: path.join(sslDirectory, 'RootCA.crt') };
