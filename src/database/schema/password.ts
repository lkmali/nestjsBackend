import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<Password>

@Schema({ timestamps: true,collection: "Password" }) 
export class Password extends Document {
  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);