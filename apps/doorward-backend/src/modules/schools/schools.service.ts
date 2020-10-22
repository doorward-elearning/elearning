import { Injectable } from '@nestjs/common';
import { CreateClassroomBody, CreateSchoolBody } from '@doorward/common/dtos/body';
import { SchoolRepository } from '@doorward/backend/repositories/school.repository';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import SchoolCreatedEmail from '../../emails/school-created.email';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import SchoolEntity from '@doorward/common/entities/school.entity';
import { MeetingRoomsService } from '../meeting-rooms/meeting-rooms.service';
import { MeetingsService } from '../meetings/meetings.service';
import { ClassroomRepository } from '@doorward/backend/repositories/classroom.repository';
import { MeetingStatus } from '@doorward/common/types/meeting';
import om from '../../utils/om';
import translate from '@doorward/common/lang/translate';

@Injectable()
export class SchoolsService {
  constructor(
    private schoolRepository: SchoolRepository,
    private emailService: EmailsService,
    private meetingRoomService: MeetingRoomsService,
    private meetingsService: MeetingsService,
    private classroomRepository: ClassroomRepository
  ) {}

  /**
   *
   */
  public async getAllSchools() {
    return this.schoolRepository.find({
      relations: ['classRooms', 'classRooms.meetingRoom'],
    });
  }

  /**
   *
   * @param body
   */
  public async createSchool(body: CreateSchoolBody) {
    if (await this.schoolRepository.findByEmail(body.email)) {
      throw new ValidationException({ email: translate.schoolWithThisEmailAlreadyExists() });
    }
    if (await this.schoolRepository.findByName(body.name)) {
      throw new ValidationException({ name: translate.schoolWithThisNameAlreadyExists() });
    }
    if (await this.schoolRepository.findByPhoneNumber(body.phoneNumber)) {
      throw new ValidationException({ phoneNumber: translate.schoolWithThisPhoneAlreadyExists() });
    }

    const school = await this.schoolRepository.save(
      this.schoolRepository.create({
        ...body,
      })
    );

    this.sendSchoolCreatedEmail(school);

    return school;
  }

  /**
   *
   * @param school
   */
  public sendSchoolCreatedEmail(school: SchoolEntity) {
    this.emailService
      .send(
        new SchoolCreatedEmail({
          subject: om`New {{school}} created`,
          data: school,
          recipient: {
            fullName: 'Admin',
            username: 'admin',
            email: process.env.DOORWARD_ADMIN_EMAIL,
          },
        })
      )
      .then();
  }

  /**
   *
   * @param schoolId
   */
  public async getSchoolById(schoolId: string) {
    return this.schoolRepository.findOne(schoolId, {
      relations: ['classRooms', 'classRooms.meetingRoom'],
    });
  }

  /**
   *
   * @param schoolId
   * @param body
   */
  public async addClassroomToSchool(schoolId: string, body: CreateClassroomBody) {
    const meetingRoom = await this.meetingRoomService.createMeetingRoom(body.name);

    await this.classroomRepository.createAndSave({
      name: body.name,
      meetingRoom,
      school: { id: schoolId },
    });

    await this.meetingsService.createMeeting(meetingRoom.id, MeetingStatus.STARTED);

    return this.getSchoolById(schoolId);
  }
}
