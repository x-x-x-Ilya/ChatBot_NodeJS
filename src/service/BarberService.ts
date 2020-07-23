import { BarberRepository } from '../repositories/BarberRepository';
const barberRepository = new BarberRepository();

export class BarberService {
  async list(): Promise<Array<any>> {
    return await barberRepository.list();
  }
}
