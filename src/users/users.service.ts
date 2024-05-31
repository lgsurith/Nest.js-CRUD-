import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

//we will be implying an async and await
//basic crud operations are done here !.

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepositry:
    Repository<User>){
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepositry.create(createUserDto);
    return await this.usersRepositry.save(user);
  }

  async findAll() {
    return await this.usersRepositry.find();
  }


  async findOne(id: number) {
    return await this.usersRepositry.findOne({
      where : { id }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user , updateUserDto);
    return await this.usersRepositry.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.usersRepositry.remove(user);
  }
}
