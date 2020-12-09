import { ServiceService } from '../service/ServiceService';
const service = new ServiceService();

export class ServiceController {
    async amenitiesList(): Promise<string> {
        return await service.amenitiesList();
    }

    async barberList(): Promise<string> {
        return await service.barberList();
    }
}
