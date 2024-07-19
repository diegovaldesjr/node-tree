import { NodesRepository } from "./nodes.repository";

export const nodeProviders = [
  {
    provide: 'NODE_REPOSITORY',
    useClass: NodesRepository,
  },
];
