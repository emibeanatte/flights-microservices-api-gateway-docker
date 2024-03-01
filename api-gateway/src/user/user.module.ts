import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [UserController],
})
export class UserModule {}
