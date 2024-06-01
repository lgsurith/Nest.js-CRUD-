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
    try{
    const wallet = this.walletsRepositry.create(createWalletDto);
    return await this.walletsRepositry.save(wallet);
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try{
    return await this.walletsRepositry.find();
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try{
    return await this.walletsRepositry.findOne({
      where : { id }
    });
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    try{
    const wallet = await this.findOne(id);
    if(!wallet){
      throw new NotFoundException();
    }
    Object.assign(wallet , updateWalletDto);

    return await this.walletsRepositry.save(wallet);
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  async remove(id: number) {
    try{
    const wallet = await this.findOne(id);
    if(!wallet){
      throw new NotFoundException();
    }
    return await this.walletsRepositry.remove(wallet);
    }catch(error){
      console.error(error);
      throw error;
    }
  }

  //to find user by the wallet address.
  async findByWalletAddress(walletAddress : string) : Promise<User | null>{
    try{
    const wallet = await this.walletsRepositry.findOne({
      where : { walletaddress : walletAddress},
      relations : ['user'],
    });

    if(!wallet){
      throw new NotFoundException();
    }

    return wallet.user;
  }catch(error){
    console.error(error);
    throw new error;
  }
  }
}
