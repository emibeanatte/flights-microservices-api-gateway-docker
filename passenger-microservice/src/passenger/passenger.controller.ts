import { Body, Controller } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';

@Controller()
export class PassengerController {

    constructor(private readonly passengerService: PassengerService){}

    @MessagePattern(PassengerMSG.CREATE)
    create(@Payload() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }

    @MessagePattern(PassengerMSG.FIND_ALL)
    findAll(){
        return this.passengerService.findAll();
    }

    @MessagePattern(PassengerMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.passengerService.findOne(id);
    }

    @MessagePattern(PassengerMSG.UPDATE)
    update(@Payload() payLoad){
        return this.passengerService.update(payLoad.id, payLoad.passengerDTO);
    }

    @MessagePattern(PassengerMSG.DELETE)
    delete(@Payload() id: string) {
        return this.passengerService.delete(id);
    }
}
