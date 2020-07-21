import { BarberRepository } from '../repositories/BarberRepository';
const barberRepository = new BarberRepository();

export class BarberService {
  async List(): Promise<Array<any>> {
    return await barberRepository.List();
  }
}
