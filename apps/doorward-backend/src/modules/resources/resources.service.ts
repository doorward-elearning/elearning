import { Injectable, NotFoundException } from '@nestjs/common';
import path from "path";
import fs from "fs";
import organizationModelsTranslate from '@doorward/common/utils/organizationModelsTranslate';
import { ORGANIZATION } from '../../bootstrap/organizationSetup';

const LOCALES_DIR = '../../../locales';

@Injectable()
export class ResourcesService {
  public async getLocaleTranslation(lang: string, file: string){
    const filePath = path.join(__dirname, LOCALES_DIR, lang, file);

    if (file.includes('..')) {
      throw new NotFoundException();
    }

    if (fs.existsSync(filePath)) {
      const language = JSON.parse(fs.readFileSync(filePath).toString());

      Object.keys(language).forEach((key) => {
        language[key] = organizationModelsTranslate(language[key], ORGANIZATION);
      });

      return language;
    }
    throw new NotFoundException();
  }
}
