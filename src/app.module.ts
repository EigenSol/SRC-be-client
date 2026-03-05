import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { ProtectedModule } from './modules/protected/protected.module';

@Module({
  imports: [HealthModule, AuthModule, ProtectedModule],
})
export class AppModule {}
