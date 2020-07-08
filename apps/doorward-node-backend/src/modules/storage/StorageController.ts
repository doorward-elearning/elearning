import { Storage, Bucket } from '@google-cloud/storage';
import OrganizationUtils from '../../utils/OrganizationUtils';
import models from '../../database/models';

export default class StorageController {
  static async uploadFile(req) {
    const storage = new Storage();
    const bucket = new Bucket(storage, process.env.DOORWARD_STORAGE_BUCKET_NAME);

    const {
      file,
      body: { owner, publicFile },
    } = req;

    const organization = OrganizationUtils.getId();

    const fileOwner = owner || (req.user && req.user.id);

    const dbFile = await models.File.create({
      name: file.originalname,
      ownerId: fileOwner,
      publicFile: !!publicFile || !req.user,
    });

    if (!file || file.length === 0) {
      return [422, { errors: { file: 'The file field is required' } }, 'Validation error'];
    }

    const fileName = dbFile.id + file.originalname.substring(file.originalname.lastIndexOf('.'));
    const newFileName = organization + '/' + (fileOwner || 'public') + '/' + fileName;

    const result = await new Promise((resolve, reject) => {
      const blob = bucket.file(newFileName);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        resolve(`/storage/${dbFile.publicFile ? 'public/' : ''}files/${dbFile.id}`);
      });

      blobStream.end(file.buffer);
    });

    await dbFile.update({
      publicUrl: result,
    });

    return [201, { file: await models.File.findByPk(dbFile.id) }];
  }

  static async getFile(req, res) {
    try {
      const { id } = req.params;
      const file = await models.File.findByPk(id);

      const storage = new Storage();
      const bucket = new Bucket(storage, process.env.DOORWARD_STORAGE_BUCKET_NAME);

      const fileName = id + file.name.substring(file.name.lastIndexOf('.'));
      const newFileName = file.organizationId + '/' + (file.ownerId || 'public') + '/' + fileName;

      if (file) {
        const blob = bucket.file(newFileName);

        await blob.download({
          destination: `/tmp/${id}`,
        });
        return res.download(`/tmp/${id}`, file.name);
      } else {
        return res.status(404);
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Error retrieving requested file.',
      });
    }
  }
}
