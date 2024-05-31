import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Repository } from 'typeorm';
import { Wallets } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallets)
    private readonly walletsRepositry:
    Repository<Wallets>){
  }
  
  async create(createWalletDto: CreateWalletDto) {
    const wallet = this.walletsRepositry.create(createWalletDto);
    return await this.walletsRepositry.save(wallet);
  }

  async findAll() {
    return await this.walletsRepositry.find();
  }

  async findOne(id: number) {
    return await this.walletsRepositry.findOne({
      where : { id }
    });
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.findOne(id);
    if(!wallet){
      throw new NotFoundException();
    }
    Object.assign(wallet , updateWalletDto);

    return await this.walletsRepositry.save(wallet);
  }

  async remove(id: number) {
    const wallet = await this.findOne(id);
    if(!wallet){
      throw new NotFoundException();
    }
    return await this.walletsRepositry.remove(wallet);
  }

  //to find user by the wallet address.
  async findByWalletAddress(walletAddress : string) : Promise<User | null>{
    const wallet = await this.walletsRepositry.findOne({
      where : { walletaddress : walletAddress},
      relations : ['user'],
    });

    if(!wallet){
      throw new NotFoundException();
    }

    return wallet.user;
  }

}
