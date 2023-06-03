import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    dateTime: Date;

    @Column('text')
    doctorId: string;

    @Column('text')
    patientId: string;

    // Relación con el doctor
    @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
    doctor: Doctor;

    // Relación con el paciente
    @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
    patient: Patient;
}