import { Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Speciality } from './entities/speciality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialitiesService {

  constructor(
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
  ) { }

  async create(createSpecialityDto: CreateSpecialityDto) {

    const { doctors = [], ...specialityData } = createSpecialityDto;

    const speciality = this.specialityRepository.create({
      ...specialityData,
      doctors: doctors.map(id => ({ id })),
    });

    await this.specialityRepository.save(speciality);

    return speciality;
  }

  findAll() {
    return `This action returns all specialities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speciality`;
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}
