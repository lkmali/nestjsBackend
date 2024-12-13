import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true, collection:"UserLoginHistory" }) // Adds createdAt and updatedAt fields automatically
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true})
  bloodGroup: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false }) // Default value for blockStatus is false
  blockStatus: boolean;

  @Prop({ default: false }) // Default value for lockUser is false
  lockUser: boolean;

  @Prop({ default: null })
  lastLoginTime: Date;

  @Prop({
    required: true,
    enum: ['user', 'shopkeeper', 'deliveryBoy'], // Enum to restrict roles
    default: 'user',
  })
  role: 'user' | 'shopkeeper' | 'deliveryBoy';
}

export const UserSchema = SchemaFactory.createForClass(User);
