import { IsString, IsArray } from "class-validator";

export class CreateAppointmentDto {

    @IsString()
    doctorId: string;

    @IsString()
    patientId: string;
}
