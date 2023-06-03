import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {

  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {

    const { appointments = [], ...data } = createDoctorDto;

    const doctor = this.doctorRepository.create({
      ...data,
      appointments: appointments.map(id => ({ id }))
    });

    await this.doctorRepository.save(doctor);
    return doctor;
  }

  findAll() {
    return `This action returns all doctors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
