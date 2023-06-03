import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Entity()
export class Speciality {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description?: string;

    @OneToMany(
        () => Doctor,
        doctor => doctor.specialty,
        { cascade: true, eager: true }
    )
    doctors?: Doctor[];
}

