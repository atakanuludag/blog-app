import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PageController } from './page.controller'
import { PageService } from './page.service'

import { Page, PageSchema } from './schemas/page.schema'

import { CoreMessage, PageMessage } from '../common/messages'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { QueryHelper } from '../common/helpers/query.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [
    CoreMessage,
    PageMessage,
    ExceptionHelper,
    QueryHelper,
    PageService,
  ],
})
export class PageModule {}
