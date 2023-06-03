import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

import { LoginPatientDto } from './dto/login-patient.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt'


@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private readonly jwtService: JwtService,
  ) { }

  async create(createPatientDto: CreatePatientDto) {

    const { appointments = [], password, ...data } = createPatientDto;

    const newPatient = this.patientRepository.create({
      ...data,
      password: bcrypt.hashSync(password, 10),
      appointments: appointments.map(appointment => ({ id: appointment })),
    });

    await this.patientRepository.save(newPatient);

    delete newPatient.password;
    return {
      ...newPatient,
      token: this.getJwtToken({ id: newPatient.id, email: newPatient.email, name: newPatient.first_name })
    };

  }

  async login(loginPatientDto: LoginPatientDto) {

    try {
      const { email, password } = loginPatientDto;

      const patient = await this.patientRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true }
      });

      if (!patient) {
        throw new UnauthorizedException('Patient not found');
      }

      if (!bcrypt.compareSync(password, patient.password)) {
        throw new UnauthorizedException('Invalid password');
      }

      delete patient.appointments;

      return {
        ...patient,
        token: this.getJwtToken({ id: patient.id, email: patient.email, name: patient.first_name })
      };

    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

  }

  findAll() {
    return `This action returns all patients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
