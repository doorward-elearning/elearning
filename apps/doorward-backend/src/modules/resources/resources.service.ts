import { Injectable, NotFoundException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import translate from '@doorward/common/lang/translate';
import configureLang from '@doorward/common/lang/backend.config';

const LOCALES_DIR = '../../../locales/en/en.default.json';

@Injectable()
export class ResourcesService {
  public async getTranslations() {
    const filePath = path.join(__dirname, LOCALES_DIR);
    console.log(filePath);

    if (fs.existsSync(filePath)) {
      const language = JSON.parse(fs.readFileSync(filePath).toString());
      await configureLang();

      Object.keys(language).forEach((key) => {
        language[key] = translate(key as any);
      });

      return language;
    }
    throw new NotFoundException();
  }
}
