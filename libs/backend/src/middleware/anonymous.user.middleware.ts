import { getConnection } from 'typeorm';
import UserEntity from '@doorward/common/entities/user.entity';
import { UserStatus } from '@doorward/common/types/users';
import { JwtService } from '@nestjs/jwt';
import DoorwardLogger from '@doorward/backend/modules/logging/doorward.logger';
import RoleEntity from '@doorward/common/entities/role.entity';

const isIdentityToken = (authorizationToken: string) => {
  return authorizationToken?.length === 50;
};

const anonymousUserMiddleware = (jwtService: JwtService, logger: DoorwardLogger) => {
  return async (request: any, response: any, next: () => void): Promise<any> => {
    try {
      const authorizationToken = request.headers.authorization?.split(' ')?.[1];
      if (isIdentityToken(authorizationToken)) {
        const username = authorizationToken;
        const connection = getConnection(request.organization.name);
        const userRepository = connection.getRepository(UserEntity);
        const roleRepository = connection.getRepository(RoleEntity);

        let user = await userRepository.findOne({ where: { username } });

        const role = await roleRepository.findOne({ where: { name: 'ANONYMOUS_USER' } });

        if (!user) {
          await userRepository.save(
            userRepository.create({
              username,
              firstName: 'Anonymous',
              lastName: 'User',
              status: UserStatus.ACTIVE,
              internal: false,
              role,
            }),
          );
          user = await userRepository.findOne({ where: { username } });
        }

        // create jwt token for this user
        const jwtToken = jwtService.sign({
          username: user.username,
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          role: user.role.id,
        });

        request.headers.authorization = 'Bearer ' + jwtToken;
      }

      next();
    } catch (e) {
      logger.error(e, 'Error creating external user');
    }
  };
};


export default anonymousUserMiddleware;
