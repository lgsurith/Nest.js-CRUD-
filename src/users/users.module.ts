import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Wallets } from 'src/wallets/entities/wallet.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User , Wallets])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
