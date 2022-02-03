import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Пользователи')
@Controller()
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get('/users')
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Пользователь по id'})
    @ApiResponse({status: 200, type: User})
    @Get('/user/:id')
    @UseGuards(JwtAuthGuard)
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    // @ApiOperation({summary: 'Информация о пользователе'})
    // @ApiResponse({status: 200, type: User})
    // @Get('me')
    // @UseGuards(JwtAuthGuard)
    // getMe() {
    //     return this.usersService.getMe();
    // }
}
