import { Controller, Get, Post, Param, HttpException, HttpStatus } from "@nestjs/common";
import { ContractService } from "./contract.service";

@Controller('contract')
export class ContractController
{
    constructor (
        private readonly contractService: ContractService,
    ) {}

    @Get("/dummy")
    createDummyContract() {
        return this.contractService.createDummyContract();
    }

    @Get("/:id")
    async getDetailContractById(@Param('id') eventId): Promise<any> {
        // contract + event name
        try {
            return await this.contractService.getDetailContractById(eventId);

        } catch (err)
        {
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
        }
    }

    @Get("/reject/:id")
    
    @Get("/accept/:id")

    @Post("/:id")
    editContract() {
        return
    }
    
}