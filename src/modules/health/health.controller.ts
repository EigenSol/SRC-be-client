import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): { status: 'ok'; service: 'be-client' } {
    return {
      status: 'ok',
      service: 'be-client',
    };
  }
}
