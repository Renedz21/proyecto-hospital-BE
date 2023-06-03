import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  @Post('register')
  async register(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Post('login')
  login(@Body() loginPatientDto: LoginPatientDto) {
    return this.patientsService.login(loginPatientDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
