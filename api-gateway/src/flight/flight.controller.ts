import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLightMSG, PassengerMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {

    constructor(private readonly clientProxy: ClientProxySuperFlights) { }

    private _clientProxyFlight = this.clientProxy.clientProxyFlights();

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FLightMSG.CREATE, flightDTO);
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlight.send(FLightMSG.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this._clientProxyFlight.send(FLightMSG.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FLightMSG.UPDATE, { id, flightDTO });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyFlight.send(FLightMSG.DELETE, id);
    }

    @Post(':fId/passenger/:pId')
    async addPassenger(
        @Param('fId') fId: string,
        @Param('pId') pId: string,
    ){
        const passenger = await this._clientProxyPassenger
        .send(PassengerMSG.FIND_ONE, pId)
        .toPromise();

        if(!passenger) throw new HttpException('Passenger not found.', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(FLightMSG.ADD_PASSENGER, {fId, pId});
    }
}
