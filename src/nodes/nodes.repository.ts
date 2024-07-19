import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Node } from "./schemas/node.schema";

@Injectable()
export class NodesRepository {
  constructor(@InjectModel(Node.name) private nodeModel: Model<Node>) {}

  async create(name: string, parentId?: string): Promise<Node> {
    if (parentId && !Types.ObjectId.isValid(parentId)) {
      throw new NotFoundException(`Invalid ID format: ${parentId}`);
    }
    const newNode = new this.nodeModel({name, children: []})

    if (parentId) {
      const parent = await this.nodeModel.findById(parentId)
      if (!parent) {
        throw new NotFoundException('Parent node not found')
      }
      parent.children.push(newNode)
      await parent.save()
    }

    return newNode.save()
  }

  async update(id: string, name: string): Promise<Node> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const node = await this.nodeModel.findByIdAndUpdate(id, { name }, { new:true });
    if (!node) {
      throw new NotFoundException('Node not found')
    }
    return node
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const node = await this.nodeModel.findById(id)
    if (!node) {
      throw new NotFoundException('Node not found')
    }
    const childrenIds = await this.getChildrenIds(node._id.toString())
    await this.nodeModel.deleteMany({_id: {$in: childrenIds}})

    await this.nodeModel.updateMany(
      { children: id },
      { $pull: { children: id } }
    ).exec();
  }

  async findRootFromNode(id: string): Promise<Node> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const node = await this.nodeModel.findById(id)
    if (!node) {
      throw new NotFoundException('Node not found')
    }
    return this.findRoot(node)
  }

  async findById(id: string): Promise<Node> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }
    const node = await this.nodeModel.findById(id)
    if (!node) {
      throw new NotFoundException('Node not found')
    }
    return node
  }

  private async getChildrenIds(id: string): Promise<string[]> {
    let ids: string[] = [id]
    const node = await this.nodeModel.findById(id).populate('children')

    if (node.children?.length > 0) {
      for (const child of node.children) {
        const idChild = child._id.toString()
        const childrenIds = await this.getChildrenIds(idChild)
        ids = ids.concat(childrenIds)
      }
    }
    return ids
  }

  private async findRoot(node: Node): Promise<Node> {
    const parentNode = await this.nodeModel.findOne({ children: node._id }).exec()
    if (!parentNode) return node

    return await this.findRoot(parentNode) 
  }

  async findAll() {
    return this.nodeModel.find()
  }
}
