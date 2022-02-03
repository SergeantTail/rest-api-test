import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    //Логин
    async login (userDto: CreateUserDto){
        const  user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    //Регистрация
    async reg(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate){
            throw new HttpException('Пользователь с таким логином уже существует',HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    //Генерируем токен
    private async generateToken(user: User){
        const payload = {login: user.login, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        };
    }

    //Валидация пользователя
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        const password = await bcrypt.compare(userDto.password, user.password);
        if(user && password){
            return user;
        }
        throw new UnauthorizedException({message: 'Некорретный логин или пароль'});
    }
}
