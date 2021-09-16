import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
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
  @Get(':id')
  findOne(@Param('id') id: number) {
    // return `This action returns #${id} coffee`;
    console.log(typeof id);
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); //check if it's an inctance instead of in the shapes
    return this.coffeesService.create(CreateCoffeeDto);
    // return body;
    //return `This action creates a coffee`;
  }

  @Patch(':id')
  update(@Param('id') id: string, UpdateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`;
    return this.coffeesService.update(id, UpdateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`;
    return this.coffeesService.remove(id);
  }
}
