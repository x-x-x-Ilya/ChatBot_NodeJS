import { ServiceRepository } from '../repositories/ServiceRepository';
import { Service } from './BotResponse';

const repository = new ServiceRepository();

export class ServiceService {
    async amenitiesList(): Promise<string> {
        const services: Array<any> = await repository.amenitiesList();
        if (services.length == 0) return Service.no_service;
        let response = '\r\n';
        for (let i = 0; i < services.length; i++) {
            response +=
                '[' +
                services[i].id +
                '] ' +
                services[i].name +
                '\t' +
                services[i].time +
                '\t' +
                services[i].price.toString() +
                '\r\n';
        }
        return response;
    }

    async barberList(): Promise<string> {
        const barbers: Array<any> = await repository.barberList();
        if (barbers.length == 0) return Service.no_barber;
        let response = '\r\n';
        for (let i = 0; i < barbers.length; i++) {
            response +=
                '[' +
                barbers[i].id +
                '] ' +
                barbers[i].first_name +
                ' ' +
                barbers[i].last_name +
                '\r\n';
        }
        return response;
    }
}
