import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, response } from 'express';
import { resolve } from 'path/posix';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// @UsePipes(new ValidationPipe())
@ApiTags('coffees') // group resources
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    // console.log('CoffeesController created');
  }

  // @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic', true)
  // @ApiResponse({ status: 403, description: 'Forbidden.' }) // Long hand version
  @ApiForbiddenResponse({ description: 'Forbidden.' }) //Short hand version
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // const { limit, offset } = paginationQuery;
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(protocol);
    return this.coffeesService.findAll(paginationQuery);
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
  }
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }
  /* 
    @Res() param decorator
    Using underlying platform Response objects (from Express.js or Fastify)
    
    🚨 Remember to use this with caution (as our code can become platform-dependent)
  */
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // return `This action returns #${id} coffee`;
    console.log(id);
    // console.log(typeof id);
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); //check if it's an inctance instead of in the shapes
    return this.coffeesService.create(createCoffeeDto);
    // return body;
    //return `This action creates a coffee`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    // return `This action updates #${id} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
