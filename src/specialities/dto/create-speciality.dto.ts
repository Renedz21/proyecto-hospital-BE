import { IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreateSpecialityDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString({ each: true })
    @IsOptional()
    @IsArray()
    doctors?: string[];
}
