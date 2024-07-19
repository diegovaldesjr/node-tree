import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Node extends Document {
  @Prop({ required: true})
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Node'}]})
  children: Node[];
}

export const NodeSchema = SchemaFactory.createForClass(Node);
