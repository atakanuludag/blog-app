import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'

export type ArticleDocument = Article & Document

@Schema({
  timestamps: true,
})
export class Article {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  shortDescription: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  guid: string

  @Prop({ default: Date.now })
  publishingDate: Date

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
  })
  categories: ObjectId[]

  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tags: ObjectId[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File', default: null })
  coverImage: ObjectId

  @Prop({ default: true })
  isShow: boolean

  @Prop({ default: 0 })
  viewCount: number

  @Prop({ default: 0 })
  likeCount: number
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
