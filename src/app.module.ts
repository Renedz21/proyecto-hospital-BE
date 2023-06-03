import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DoctorsModule,
    SpecialitiesModule,
    AppointmentsModule,
    PatientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
