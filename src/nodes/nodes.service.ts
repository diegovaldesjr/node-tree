import { Inject, Injectable } from "@nestjs/common";
import { NodesRepository } from "./nodes.repository";
import { Node } from "./schemas/node.schema";

@Injectable()
export class NodesService {
  constructor(@Inject('NODE_REPOSITORY') private readonly nodeRepository: NodesRepository) {}

  async create(name: string, parentId?: string): Promise<Node> {
    return this.nodeRepository.create(name, parentId)
  }

  async update(id: string, name: string): Promise<Node> {
    return this.nodeRepository.update(id, name)
  }

  async remove(id: string): Promise<void> {
    return this.nodeRepository.remove(id)
  }

  async getRootFromNode(id: string): Promise<Node> {
    return this.nodeRepository.findRootFromNode(id)
  }

  async getById(id: string): Promise<Node> {
    return this.nodeRepository.findById(id)
  }

  async getAll(): Promise<Node[]> {
    return this.nodeRepository.findAll()
  }
}
