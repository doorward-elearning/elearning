import { Seeder } from 'typeorm-seeding';
import { Connection, ObjectType } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';
import { CapabilityEntity } from '../entities/capability.entity';

export default class CreateCapabilities implements Seeder {
  public async run(
    factory: <Entity, Context>(entity: ObjectType<Entity>) => (context?: Context) => EntityFactory<Entity, Context>,
    connection: Connection
  ): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CapabilityEntity)
      .values([
        {
          capability: 'JOIN_WITH_ACTIVE_AUDIO',
          name: 'Join with active audio',
          createdAt: new Date(),
          description: 'Allows a participant to join with their microphone enabled.',
          updatedAt: new Date(),
        },
        {
          capability: 'JOIN_WITH_ACTIVE_VIDEO',
          name: 'Join with active video',
          createdAt: new Date(),
          description: 'Allows a participant to join with their video enabled.',
          updatedAt: new Date(),
        },
        {
          capability: 'PUBLISH_VIDEO',
          name: 'Publish video',
          createdAt: new Date(),
          description: 'Allows a participant to share their video.',
          updatedAt: new Date(),
        },
        {
          capability: 'PUBLISH_AUDIO',
          name: 'Publish audio',
          createdAt: new Date(),
          description: 'Allows a participant to share their audio.',
          updatedAt: new Date(),
        },
        {
          capability: 'CHAT',
          name: 'Chat',
          createdAt: new Date(),
          description: 'Allows a participant to chat with others.',
          updatedAt: new Date(),
        },
        {
          capability: 'SHARE_SCREEN',
          name: 'Share screen',
          createdAt: new Date(),
          description: 'Allows a participant to share their screen.',
          updatedAt: new Date(),
        },
        {
          capability: 'AUTO_JOIN_SESSION',
          name: 'Auto join session',
          createdAt: new Date(),
          description: 'Allows a participant to join session without configuring their devices.',
          updatedAt: new Date(),
        },
        {
          capability: 'EXIT_MEETING',
          name: 'Exit meeting',
          createdAt: new Date(),
          description: 'Allows a participant to exit the meeting.',
          updatedAt: new Date(),
        },
        {
          capability: 'TURN_ON_PARTICIPANTS_VIDEO',
          name: 'Turn on participants videos',
          createdAt: new Date(),
          description: 'Allows a participant to turn on participants videos.',
          updatedAt: new Date(),
        },
        {
          capability: 'TURN_OFF_PARTICIPANTS_VIDEO',
          name: 'Turn off participants videos',
          createdAt: new Date(),
          description: 'Allows a participant to turn off participants videos.',
          updatedAt: new Date(),
        },
        {
          capability: 'MUTE_PARTICIPANTS',
          name: 'Mute participants',
          createdAt: new Date(),
          description: 'Allows a participant to mute other participants.',
          updatedAt: new Date(),
        },
        {
          capability: 'UNMUTE_PARTICIPANTS',
          name: 'Unmute other participants',
          createdAt: new Date(),
          description: 'Allows a participant unmute other participants.',
          updatedAt: new Date(),
        },
        {
          capability: 'PUBLISH_WHITEBOARD',
          name: 'Publish whiteboard',
          createdAt: new Date(),
          description: 'Allows a participant to ask other participants questions.',
          updatedAt: new Date(),
        },
        {
          capability: 'ASK_QUESTIONS',
          name: 'Ask questions',
          createdAt: new Date(),
          description: 'Allows a participant to ask other participants questions.',
          updatedAt: new Date(),
        },
      ])
      .execute();
  }
}
