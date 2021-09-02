import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrganizationsRepository from '@doorward/backend/repositories/organizations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationsRepository])],
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
