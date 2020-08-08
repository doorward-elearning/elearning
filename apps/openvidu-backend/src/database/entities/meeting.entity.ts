import BaseEntity from './base.entity';
import { Entity } from 'typeorm';

@Entity({
  name: 'meetings',
})
export default class MeetingEntity extends BaseEntity {

}
