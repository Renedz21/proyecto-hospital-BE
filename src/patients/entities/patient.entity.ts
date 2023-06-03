import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Patient {
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

    @Column('date')
    birth_date: Date;

    @Column('text', { unique: true })
    email: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('text', {
        array: true,
        default: ['patient'],
    })
    roles: string[];

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    // Relación con las citas del paciente
    @OneToMany(() => Appointment, appointment => appointment.patient, { cascade: true, eager: true })
    appointments: Appointment[];
}