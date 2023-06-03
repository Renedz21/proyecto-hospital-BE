import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Patient } from '../entities/patient.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<Patient> {
        const { id } = payload;
        const patient = await this.patientRepository.findOneBy({ id });

        if (!patient) {
            throw new UnauthorizedException("Invalid token");
        }

        if (!patient.isActive) {
            throw new UnauthorizedException("User is not active");
        }

        return patient;
    }



}