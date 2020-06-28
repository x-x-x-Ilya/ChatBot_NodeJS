// eslint-disable-next-line @typescript-eslint/no-var-requires
import { where } from 'sequelize';

import {barbers} from '../database/models/barbers';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class BarberRepository {

  async showBarberList() {
    return await barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true
    });
  }

    async selectBarber(id) {
    return await barbers.findOne({
      where:{
        id:id
      }
    });
  }

}