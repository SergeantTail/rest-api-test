import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtService} from "@nestjs/jwt";
import {REQUEST} from "@nestjs/core";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @Inject(REQUEST) private readonly request: Request,
                private jwtService: JwtService){}

    public data = ['id', 'login', 'createdAt', 'updatedAt'];

    //Создаем пользователя
    async createUser(dto: CreateUserDto){
        const  user = await this.userRepository.create(dto);
        return user;
    }

    //Получение всех пользователей
    async getAllUsers(){
        const users = await this.userRepository.findAll();
        return users;
    }

    //Получение пользователя по логину (для валидации)
    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where: {login}})
        return user;
    }

    //Получение пользователя по айди
    async getUserById(id: string){
        const user = await this.userRepository.findByPk(id, {attributes: this.data})
        return user;
    }


    // async getMe() {
    //
    // }
}
