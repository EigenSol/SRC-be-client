import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getRequiredEnv } from '../../../config/env.validation';

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface JwtAuthenticatedUser {
  userId: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getRequiredEnv('AUTH_JWT_PUBLIC_KEY'),
      algorithms: ['RS256'],
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload): JwtAuthenticatedUser {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
