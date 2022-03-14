import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PasswordResets, User } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, EditUserDto, EditUserGenderDto, EditUserMobileDto } from './dtos';


export interface UserFindOne{
  id?:number;
  email?:string;
}

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getMany() {
    return await this.userRepository.find()
  }
  
  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exists')

    return user;
  }
  
  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if (userExist) throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto)
    const user = await this.userRepository.save(newUser)
    

    delete user.password;
    return user;
  }
  
  async editOne(id: number, dto: EditUserDto) {
    const user = await this.getOne(id)   
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }
  
  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this.userRepository.remove(user);
  }
  
  async findOneEmail(email:string){
   return await this.userRepository.findOne({email});
  }
  
  async findOne(data:UserFindOne){
    return await this.userRepository
        .createQueryBuilder('user')
        .where(data) 
        .addSelect('user.password')
        .getOne();
  }
  async editGender(id: number,data:EditUserGenderDto){
    const user = await this.getOne(id)   
    const editedUser = Object.assign(user, data);
    return await this.userRepository.save(editedUser);
  }

  async editMobile(id: number,data:EditUserMobileDto){
    const user = await this.getOne(id)   
    const editedUser = Object.assign(user, data);
    return await this.userRepository.save(editedUser);
  }
  getImc(user:User){
    return (user.weight/(user.height*2));
  }
  async saveorupdateRefreshToke(
    refreshToken:string,
    id:string, 
    refreshtokenexpires){
    await this.userRepository.update(id,{refreshtoken:refreshToken, refreshtokenexpires});
   }

   async updateImage(
    name_image:string,
    id:string
    ){
    await this.userRepository.update(id,{image_profile:name_image});
   }

   async changePassword(email:string,password:string) {
    const user = await this.userRepository.findOne({ email: email });

    if (!user) throw new BadRequestException('El usuario no existe');
    user.password = password;
    await this.userRepository.save(user);
   }

   
    
}
