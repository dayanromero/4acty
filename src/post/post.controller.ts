import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  
  import { PostService } from './post.service';
  import { CreatePostDto, EditPostDto } from './dto';
import { Auth } from 'src/common/decorators';
  
  @ApiTags('Posts')
  @Controller('post')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @Get()
    async getMany() {
      const data = await this.postService.getMany();
      return { data };
    }
  
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
      const data = await this.postService.getById(id);
      return { data };
    }
    @Auth()
    @Post()
    async createPost(@Body() dto: CreatePostDto) {
      const data = await this.postService.createOne(dto);
      return { message: 'Post created', data };
    }
    @Auth()
    @Put(':id')
    async editOne(@Param('id') id: number, @Body() dto: EditPostDto) {
      const data = await this.postService.editOne(id, dto);
      return { message: 'Post edited', data };
    }
    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
      const data = await this.postService.deleteOne(id);
      return { message: 'Post deleted', data };
    }
  }
