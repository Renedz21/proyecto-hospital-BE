import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    first_name: string;

    @Column('text')
    last_name: string;

    @Column('text')
    dni: string;

    @Column('text')
    phone: string;

    @Column('numeric')
    age: number;

    @Column('text')
    gender: string;

    @Column('text')
    specialtyId?: string;

    //Relación con la especialidad del doctor
    @ManyToOne(() => Speciality, speciality => speciality.doctors)
    specialty: Speciality;

    //Relación con las citas del doctor
    @OneToMany(
        () => Appointment,
        appointment => appointment.doctor,
        { cascade: true, eager: true }
    )
    appointments?: Appointment[];
}
