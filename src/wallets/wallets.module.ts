import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wallets } from './entities/wallet.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User , Wallets])],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
