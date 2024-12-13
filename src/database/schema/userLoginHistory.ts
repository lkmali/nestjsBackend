import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
export type UserLoginHistoryDocument = HydratedDocument<UserLoginHistory>

@Schema({ timestamps: true, collection: "UserLoginHistory" }) // Adds createdAt and updatedAt fields automatically
export class UserLoginHistory {
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
    @Prop({ required: false })
    ipAddress: string;
    @Prop({ required: true,default:1 })
    noOfAttend: number;
    @Prop({ default: false }) // Default value for success is false
    success: boolean;
    @Prop({ default: null }) 
    lastLoginTime: Date;
}

export const UserLoginHistorySchema = SchemaFactory.createForClass(UserLoginHistory);
