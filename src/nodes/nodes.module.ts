import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NodesService } from "./nodes.service";
import { NodesController } from "./nodes.controller";
import { Node, NodeSchema } from "./schemas/node.schema";
import { nodeProviders } from "./nodes.provider";

@Module({
  imports: [MongooseModule.forFeature([{name: Node.name, schema: NodeSchema}])],
  controllers: [NodesController],
  providers: [...nodeProviders, NodesService]
})
export class NodesModule {}
