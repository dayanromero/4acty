import { Injectable } from '@nestjs/common';
import { UserBodyEntity } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBodyDto } from './dto/create-userbody.dto';
import { User } from 'src/user/entity';

@Injectable()
export class UserBodyService {

    constructor(
        @InjectRepository(UserBodyEntity)
        private readonly userBodyRepository: Repository<UserBodyEntity>
      ) {}

      async findOne(id: User) {
        const userBody = await this.userBodyRepository.findOne({user:id})   
        return userBody;
      }

      async findOneSetings(id: User) {
        const userBody = await this.userBodyRepository.findOne({user:id})
        if(!userBody){
          return {};  
        }   
        let userSeted = this.removeUserRelation(userBody)
        return userSeted;
      }


      async createOne(user: User,dto: CreateUserBodyDto) {
        let userExist = await this.findOne(user);
        let userbody:UserBodyEntity; 

        dto.user = user;

        if(userExist){
        
          const editedUser = Object.assign(userExist, dto);
          userbody = await this.userBodyRepository.save(editedUser);
        
        }else{
        
          const newUserBody = this.userBodyRepository.create(dto)
          userbody = await this.userBodyRepository.save(newUserBody)
        
        }
        
        return this.removeUserRelation(userbody);
      }


      async editOne(id: User, dto: CreateUserBodyDto) {
        const user = await this.userBodyRepository.find({user:id})   
        const editedUserBody = Object.assign(user, dto);
        return await this.userBodyRepository.save(editedUserBody);
      }

      async removeUserRelation(userBody:CreateUserBodyDto){
         
        const {user,...userBodyNew} = userBody;
        let biceps = await this.generateJson(userBodyNew.biceps);
        let forearm = await this.generateJson(userBodyNew.forearm);
        let thigh = await this.generateJson(userBodyNew.thigh);
        let calf = await this.generateJson(userBodyNew.calf);
        
        return {"biceps":biceps,"forearm":forearm,"thigh":thigh,"calf":calf}

      }
      
      async generateJson(object:string){
        var positions = object.split(',');
        return await {"des":positions[0],"izq":positions[1]};

      }
      

}
