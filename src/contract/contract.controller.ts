import { Controller, Get, Param, Post, UseGuards, UsePipes, Request, ValidationPipe, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from 'src/entity/contract.entity';
import { AuthGuard } from '@nestjs/passport';
import CreateContractDto from './dto/create-contract-dto';

@Controller('contract')
export class ContractController {
    constructor(
        private readonly contractService: ContractService
    ) {}
    
    @UseGuards(AuthGuard("jwt"))
    @Get(":id")
    findContractById(@Param() params): Promise<Contract> {
        return this.contractService.findContractById(params.id);
    }

    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post()
    async createContract(@Body() newContract: CreateContractDto, @Request() req): Promise<any> {
        try {
            newContract.hireeId = req.user.hireeId;
            await this.contractService.createContract(newContract);
            return {
                status: 200,
                message: "OK"
            };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }

    }
}
