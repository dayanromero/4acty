import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePoinstUserDto } from './dto';
import { Repository } from 'typeorm';
import { PointsUser } from './entity/points-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity';

@Injectable()
export class PointsUserService {
    constructor(
        @InjectRepository(PointsUser)
        private readonly pointsUser: Repository<PointsUser>
    ){}

    async createOne(dto:CreatePoinstUserDto){

        // const pointerUserExist = await this.pointsUser.findOne({where: { test: dto.test, user: dto.user}});
    // if (pointerUserExist) throw new BadRequestException('Challange Test already registered');

        const newPointsUser = this.pointsUser.create(dto)
        const pointerUser = await this.pointsUser.save(newPointsUser);
        const {id,user,...rest} = pointerUser;
        return rest;
    }

    async getOne(dto:CreatePoinstUserDto){
        const pointerUserExist = await this.pointsUser.findOne({where: { test: dto.test, user: dto.user}});
        return pointerUserExist;
    }

    async updateOne(dto:CreatePoinstUserDto){
        const pointerUserExist = await this.pointsUser.findOne({where: { test: dto.test, user: dto.user}});
        const pointsUser = Object.assign(pointerUserExist, dto);
        const pointerUser = await this.pointsUser.save(pointsUser);
        const {id,user,...rest} = pointerUser;
        return await rest;
    }

    /**
     * Obtener los los puntos por usuario
     * @param user 
     * @returns 
     */
     async getPointUser(user:User){
        return await  this.pointsUser.find({
            relations:['test'],
            join: {alias: 'userpoints',innerJoinAndSelect: {test: 'userpoints.test',modules:'test.module'}},
            where: qb => {
                qb.where({user:user})
            },

        });
    }
}
