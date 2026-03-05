import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthenticatedUser } from '../auth/strategies/jwt.strategy';

interface AuthenticatedRequest extends Request {
  user: JwtAuthenticatedUser;
}

@Controller('api/protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get('ping')
  getProtectedPing(@Req() request: AuthenticatedRequest): {
    ok: true;
    message: string;
    user: JwtAuthenticatedUser;
  } {
    return {
      ok: true,
      message: 'Backend token verification succeeded',
      user: request.user,
    };
  }
}
