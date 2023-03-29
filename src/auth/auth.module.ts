import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.schema';
import { AuthMiddleware } from './auth.middleware';
// import { AuthController } from './auth.controller';
// import { AuthService } from './service/auth.service';
// import { JwtService } from './service/jwt.service';
// import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([Auth]),
  ],
  //   controllers: [AuthController],
  //   providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('auth');
  }
}
