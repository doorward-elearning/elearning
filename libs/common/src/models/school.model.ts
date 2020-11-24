import BaseModel from '@doorward/common/models/base.model';
import ClassroomEntity from '@doorward/common/entities/classroom.entity';

export default interface SchoolModel extends BaseModel {
  name: string;
  email: string;
  phoneNumber: string;
  classRooms: Array<ClassroomEntity>;
}
