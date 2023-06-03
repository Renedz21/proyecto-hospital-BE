import { IsString, IsNumber, IsDateString, IsArray } from 'class-validator';

export class CreatePatientDto {

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    dni: string;

    @IsString()
    phone: string;

    @IsNumber()
    age: number;

    @IsDateString()
    birth_date: Date;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString({ each: true })
    @IsArray()
    appointments: string[];

}
