import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/signup')
    signup(@Body() userDto: CreateUserDto) {
        return this.authService.reg(userDto);
    }

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/signin')
    signin(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }
}
