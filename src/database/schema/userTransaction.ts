import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
export type UserLoginHistoryDocument = HydratedDocument<UserTransactionHistory>

@Schema({ timestamps: true, collection: "UserTransactionHistory" }) // Adds createdAt and updatedAt fields automatically
export class UserTransactionHistory {
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
    @Prop({ required: false })
    transactionId: string;
    @Prop({ required: true })
    orderId: string;
    @Prop({ required: true })
    amount: number
    

}

export const UserTransactionHistorySchema = SchemaFactory.createForClass(UserTransactionHistory);
