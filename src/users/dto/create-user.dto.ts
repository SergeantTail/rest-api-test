import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{

    @ApiProperty({example: 'TestLogin', description: 'Логин пользователя'})
    readonly login: string;

    @ApiProperty({example: 'TestPassword', description: 'Пароль пользователя'})
    readonly password: string;
}