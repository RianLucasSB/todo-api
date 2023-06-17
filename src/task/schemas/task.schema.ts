import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TaksDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: false })
  date: Date;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
