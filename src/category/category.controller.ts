import { Controller, Put, Get, Param, Body, Post, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth, User } from 'src/common/decorators';
import { CreateCategoryDTO,editCreateCategoryDTO, GetCategoryModuleDTO} from './dto';
import { UserCategoryService } from 'src/user-category/user-category.service';
import { TransformInterceptor } from 'src/shared/http-response';
import { User as UserEntity } from 'src/user/entity';
// import { UserCategoryService } from 'src/user-category/user-category.service';
import { calculatePercentage } from "src/common/helpers/operationsMath";


@Controller('category')
@UseInterceptors(TransformInterceptor)
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly userCategoryService: UserCategoryService
    ){}

    @Auth()
    @Get()
    async getCategorys(
      @Body() dto
    ) {
    
      let category = await this.categoryService.getCategorys();
      return { data: category }
    }

    @Auth()
    @Get(':id')
    async getCategory(
      @Param('id') id: number,
      // @Body() dto,
    ) {

      let category = await this.categoryService.getById(id);
      return { data: category }
    }

    @Auth()
    //verifica si el usuario tiene permisos para poder modificar el usuario
    @Post()
    async createOne(
      @Body() dto: CreateCategoryDTO
    ) {
      const data = await this.categoryService.createOne(dto)
      return { message: 'category created', data }
    }

    @Auth()
    //verifica si el usuario tiene permisos para poder modificar el usuario
    @Put(':id')
    async editOne(
      @Param('id') id: number,
      @Body() dto: editCreateCategoryDTO
    ) {
      const data = await this.categoryService.editOne(id,dto)
      return { message: 'category updated', data }
    }

    @Auth()
    @Get('/module/:module')
    async getCategoryForModule(  
      @Param() dto:GetCategoryModuleDTO,
      @User() user:UserEntity
    ) {
      let categoryModuleUser = await this.userCategoryService.getUserWhitCategoryGroupModule(dto.module,user);

      let categoryModule = await this.categoryService.getCategorysForModule(dto.module);
      
      let countStatus = 0;

      for (let index = 0; index < categoryModule.length; index++) {
        const categoryId = categoryModule[index].id;
        categoryModule[index]['blocked']=true;
        categoryModule[index]['estatus']='incomplete';

        let totalRecordCompleted =await this.userCategoryService.getStatusCategoryCountStatus(dto.module,user,categoryId,2);
        let totalRecord = await this.userCategoryService.getStatusCategoryCountAll(dto.module,user,categoryId);

      
        
        
        for (let index = 0; index < categoryModuleUser.length; index++) {
          const categoryModUser = categoryModuleUser[index]['category'];
          if(categoryId==categoryModUser){
            categoryModule[index]['blocked']=false;
          }
        }
        
        if(!categoryModule[index]['blocked']){
          if(totalRecordCompleted===totalRecord){
            categoryModule[index]['percentage']=100;
            categoryModule[index]['estatus']='completed';
          }else{
            countStatus++;
            let porcent =await calculatePercentage(totalRecordCompleted,totalRecord);
            categoryModule[index]['percentage']=porcent;
          }
        }
        
      }
      let estatusGlobal = (countStatus==0)?'complete':'incomplete';
      return { data: categoryModule,aditional:{estatus:estatusGlobal}}
    }
}
