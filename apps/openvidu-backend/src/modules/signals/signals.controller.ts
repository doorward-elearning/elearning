import { Controller, UseGuards } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}
}
