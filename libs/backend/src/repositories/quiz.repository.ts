import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { EntityRepository } from 'typeorm';
import { QuizEntity } from '@doorward/common/entities/quiz.entity';

@EntityRepository(QuizEntity)
export default class QuizRepository extends ModuleItemsRepository<QuizEntity> {}
