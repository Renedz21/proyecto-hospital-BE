import { IsString } from 'class-validator';

export class LoginPatientDto {

    @IsString()
    email: string;

    @IsString()
    password: string;

}
