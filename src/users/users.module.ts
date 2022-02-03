import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {AppModule} from "../app.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User]),
  ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
