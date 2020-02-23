import { Storage, Bucket } from '@google-cloud/storage';
import OrganizationUtils from '@edudoor/common/utils/OrganizationUtils';
import models from '../../database/models';

export default class StorageController {
  static async uploadFile(req) {
    const storage = new Storage();
    const bucket = new Bucket(storage, process.env.EDUDOOR_STORAGE_BUCKET_NAME);

    const { file, body } = req;

    const owner = body.owner || req.user.id;

    const organization = OrganizationUtils.getId();

    const dbFile = await models.File.create({
      name: file.originalname,
      ownerId: owner,
      organizationId: organization,
    });

    if (!file || file.length === 0) {
      return [422, { errors: { file: 'The file field is required' } }, 'Validation error'];
    }

    const fileName = dbFile.id + file.originalname.substring(file.originalname.lastIndexOf('.'));
    const newFileName = organization + '/' + owner + '/' + fileName;

    const result = await new Promise((resolve, reject) => {
      const blob = bucket.file(organization + '/' + newFileName);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        resolve(newFileName);
      });

      blobStream.end(file.buffer);
    });

    await dbFile.update({
      publicUrl: result,
    });

    return [201, { result }];
  }

  static async getFile(req) {}
}
