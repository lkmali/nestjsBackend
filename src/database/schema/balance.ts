import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<Balance>

@Schema({ timestamps: true, collection: "Balance" }) 
export class Balance extends Document {
  @Prop({ required: true, default: 0 })
   amount: number;

 @Prop({ required: true, default: 1 })
   currencyType: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);