import { Controller, Get, Body, Post, UseInterceptors, Param } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { Auth } from 'src/common/decorators';
import { TransformInterceptor } from 'src/shared/http-response';

@Controller('cycles')
@UseInterceptors(TransformInterceptor)
export class CyclesController {
    constructor(
        private readonly categoryService: CyclesService,
    ){}
    
    @Auth()
    @Post()
    async getCyclesCategory(
      @Body() dto
    ) {
      let category = await this.categoryService.getCycleForCategory(dto.category);
      return { data: category }
    }

    @Auth()
    @Post('/difficulty')
    async getCyclesCategoryDifficultys(
      @Body() dto
    ) {
      let category = await this.categoryService.getCycleDifficulty(dto.category);
      return { data: category }
    }

    @Auth()
    @Get('category/:category')
    async getCyclesCategoryVideos(
      @Param() dto
    ) {
      
      let category = await this.categoryService.getCycleVideosDifficulty(dto.category);
      return { data: category }
    }

    @Auth()
    @Get(':id')
    async getCycle(
      @Param('id') id
    ) {
      
      let cycle = await this.categoryService.getOne(id);
      return { data: cycle }
    }


}
