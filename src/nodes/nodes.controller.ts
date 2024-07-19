import { Controller, Post, Body, Put, Param, Delete, Get } from "@nestjs/common";
import { NodesService } from "./nodes.service";
import { Node } from "./schemas/node.schema";

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Get(':id')
  async findById(@Param('id') id:string): Promise<Node> {
    return await this.nodesService.getById(id)
  }

  @Post()
  async create(@Body('name') name:string, @Body('parentId') parentId: string): Promise<Node> {
    return await this.nodesService.create(name, parentId)
  }

  @Put(':id')
  async update(@Param('id') id:string, @Body('name') name:string): Promise<Node> {
    return await this.nodesService.update(id, name)
  }

  @Delete(':id')
  async remove(@Param('id') id:string): Promise<void> {
    return await this.nodesService.remove(id)
  }

  @Get('root/:id')
  async findRoot(@Param('id') id:string): Promise<Node> {
    return await this.nodesService.getRootFromNode(id)
  }

  @Get()
  async getAll() {
    return await this.nodesService.getAll()
  }
}
