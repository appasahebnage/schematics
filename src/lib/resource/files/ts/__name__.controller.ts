<% if (crud && type === 'rest') { %>import { JwtGuard } from '@/common/auth/guards/jwt.guard';
import { ZodBodyValidationPipe } from '@/common/utils';
import {
  Create<%= classify(name) %>RequestDto,
  List<%= classify(name) %>ResponseDto,
  Update<%= classify(name) %>RequestDto,
  <%= classify(name) %>Dto,
} from '@app/api';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
<%
} else if (crud && type === 'microservice') { %>import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';

<% if (crud && type === 'rest') { %>
@Controller('<%= dasherize(name) %>s')
@ApiTags('<%= classify(name) %>s')
@UseGuards(JwtGuard)<% } else { %>@Controller()<% } %>
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

  @Post()
  @UsePipes(new ZodBodyValidationPipe(Create<%= singular(classify(name)) %>RequestDto))
  public async create<%= classify(name) %>(@Body() dto: Create<%= singular(classify(name)) %>RequestDto) {
    return await this.<%= lowercased(name) %>Service.create<%= classify(name) %>(dto);
  }

  @Get()
  public async findAll<%= classify(name) %>(): Promise<List<%= classify(name) %>ResponseDto> {
    return await this.<%= lowercased(name) %>Service.findAll<%= classify(name) %>();
  }

  @Get(':<%= camelize(name) %>Id')
  public async findOne<%= classify(name) %>(@Param('<%= camelize(name) %>Id') <%= camelize(name) %>Id: string): Promise<<%= classify(name) %>Dto> {
    return await this.<%= lowercased(name) %>Service.findOne<%= classify(name) %>(<%= camelize(name) %>Id);
  }

  @Patch(':<%= camelize(name) %>Id')
  @UsePipes(new ZodBodyValidationPipe(Update<%= singular(classify(name)) %>RequestDto))
  public async update<%= classify(name) %>(
    @Param('<%= camelize(name) %>Id') <%= camelize(name) %>Id: string,
    @Body() dto: Update<%= singular(classify(name)) %>RequestDto,
  ): Promise<<%= classify(name) %>Dto> {
    return await this.<%= lowercased(name) %>Service.update<%= classify(name) %>(<%= camelize(name) %>Id, dto);
  }

  @Delete(':<%= camelize(name) %>Id')
  public async remove<%= classify(name) %>(@Param('<%= camelize(name) %>Id') <%= camelize(name) %>Id: string) {
    return await this.<%= lowercased(name) %>Service.remove<%= classify(name) %>(<%= camelize(name) %>Id);
  }<% } else if (type === 'microservice' && crud) { %>

  @MessagePattern('create<%= singular(classify(name)) %>')
  create(@Payload() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto);
  }

  @MessagePattern('findAll<%= classify(name) %>')
  findAll() {
    return this.<%= lowercased(name) %>Service.findAll();
  }

  @MessagePattern('findOne<%= singular(classify(name)) %>')
  findOne(@Payload() id: number) {
    return this.<%= lowercased(name) %>Service.findOne(id);
  }

  @MessagePattern('update<%= singular(classify(name)) %>')
  update(@Payload() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.update(update<%= singular(classify(name)) %>Dto.id, update<%= singular(classify(name)) %>Dto);
  }

  @MessagePattern('remove<%= singular(classify(name)) %>')
  remove(@Payload() id: number) {
    return this.<%= lowercased(name) %>Service.remove(id);
  }<% } %>
}
