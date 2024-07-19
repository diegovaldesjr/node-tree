import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { NodesService } from '../nodes/nodes.service';
import { readFileSync } from 'fs';
import { join } from 'path';

interface NodeData {
  id?: string;
  name: string;
  children?: NodeData[];
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const nodesService = app.get<NodesService>(NodesService);

  const data = JSON.parse(readFileSync(join(__dirname, '..', '..', 'seed-data.json'), 'utf-8'));

  for (const nodeData of data.nodes) {
    await createTree(nodesService, nodeData)
  }

  console.log('Database seeded successfully');
  await app.close();
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});

async function createTree(nodesService: NodesService, nodeData: NodeData, idParent?: string | null): Promise<void> {
  const createdNode = await nodesService.create(nodeData.name, idParent);

  if (!nodeData.children || nodeData.children.length < 1) return

  for (const child of nodeData.children) {
    await createTree(nodesService, child, createdNode._id.toString())
  }
}
