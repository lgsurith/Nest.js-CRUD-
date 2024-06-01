import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

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
    try{
    const hashedPassword = await bcrypt.hash(createUserDto.password , 10);
    const user = this.usersRepositry.create({...createUserDto , password : hashedPassword});
    return await this.usersRepositry.save(user);
    }catch(error){
      console.error('User cannot be created : ' , error);
      throw error;
    }
  }

  async findAll() {
    try{
    return await this.usersRepositry.find();
    }catch(error){
      console.error('Cannot fetch all the users : ' , error);
      throw error;
    }
  }


  async findOne(id: number) {
    try{
    return await this.usersRepositry.findOne({
      where : { id }
    });
    }catch(error){
      console.error('Cannot find User : ' , error);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
    const user = await this.findOne(id);

    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user , updateUserDto);
    return await this.usersRepositry.save(user);
    }catch(error){
      console.error('Cannot Update User : ' , error);
      throw error;
    }
  }

  async remove(id: number) {
    try{
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.usersRepositry.remove(user);
    }catch(error){
      console.error('Cannot remove the user : ' , error);
      throw error;
    }
  }
}
