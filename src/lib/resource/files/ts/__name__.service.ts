import { Injectable } from '@nestjs/common';<% if (crud && type !== 'graphql-code-first' && type !== 'graphql-schema-first') { %>
  import {
    Create<%= classify(name) %>RequestDto,
    List<%= classify(name) %>ResponseDto,
    Update<%= classify(name) %>RequestDto,
    <%= classify(name) %>Dto,
  } from '@app/api';
  import { PrismaService } from '@/common/prisma/prisma.service';
  import { Prisma } from '@app/prisma';<% } else if (crud) { %>
  import { Create<%= singular(classify(name)) %>Input } from './dto/create-<%= singular(name) %>.input';
  import { Update<%= singular(classify(name)) %>Input } from './dto/update-<%= singular(name) %>.input';<% } %>
  
  @Injectable()
  export class <%= classify(name) %>Service {<% if (crud) { %>
    constructor(private readonly prisma: PrismaService) {}
  
    public async create<%= classify(name) %>(dto: Create<%= singular(classify(name)) %>RequestDto): Promise<<%= classify(name) %>Dto> {
      const data: Prisma.<%= classify(name) %>CreateInput = {
        ...dto,
      };
      return await this.prisma.<%= camelize(name) %>.create({
        data,
      });
    }
  
    public async findAll<%= classify(name) %>(): Promise<List<%= classify(name) %>ResponseDto> {
      return await this.prisma.<%= camelize(name) %>.findMany();
    }
  
    public async findOne<%= classify(name) %>(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>Dto> {
      return await this.prisma.<%= camelize(name) %>.findUniqueOrThrow({
        where: {
          <%= camelize(name) %>Id,
        },
      });
    }
  
    public async update<%= classify(name) %>(<%= camelize(name) %>Id: string, dto: Update<%= singular(classify(name)) %>RequestDto): Promise<<%= classify(name) %>Dto> {
      await this.findOne<%= classify(name) %>(<%= camelize(name) %>Id);
      return await this.prisma.<%= camelize(name) %>.update({
        where: {
          <%= camelize(name) %>Id,
        },
        data: dto,
      });
    }
  
    public async remove<%= classify(name) %>(<%= camelize(name) %>Id: string): Promise<<%= classify(name) %>Dto> {
      await this.findOne<%= classify(name) %>(<%= camelize(name) %>Id);
      return await this.prisma.<%= camelize(name) %>.delete({
        where: {
          <%= camelize(name) %>Id,
        },
      });
    }
  <% } %>}
  