import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FLightMSG } from 'src/common/constants';

@Controller()
export class FlightController {

    constructor(private readonly flightService: FlightService) { }

    @MessagePattern(FLightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @MessagePattern(FLightMSG.FIND_ALL)
    findAll() {
        return this.flightService.findAll();
    }

    @MessagePattern(FLightMSG.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.flightService.findOne(id);
    }

    @MessagePattern(FLightMSG.UPDATE)
    update(@Payload('id') payLoad) {
        return this.flightService.update(payLoad.id, payLoad.flightDTO);
    }

    @MessagePattern(FLightMSG.DELETE)
    delete(@Payload() id: string) {
        return this.flightService.delete(id);
    }

    @MessagePattern(FLightMSG.ADD_PASSENGER)
    addPassenger(@Payload() payLoad) {
        return this.flightService.addPassenger(payLoad.fId, payLoad.pId);
    }

}
