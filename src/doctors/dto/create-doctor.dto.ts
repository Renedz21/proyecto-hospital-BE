import { IsString, IsNumber, IsOptional, MinLength, MaxLength, IsArray } from 'class-validator';

export class CreateDoctorDto {
    @IsString()
    @MinLength(1)
    first_name: string;

    @IsString()
    @MinLength(1)
    last_name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(8)
    dni: string;

    @IsString()
    @MinLength(1)
    @MaxLength(9)
    phone: string;

    @IsNumber()
    age: number;

    @IsString()
    gender: string;

    @IsString()
    @IsOptional()
    specialtyId?: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    appointments?: string[];
}

