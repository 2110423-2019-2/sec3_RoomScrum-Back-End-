import { Controller, Get, Post } from "@nestjs/common";
import { ContractService } from "./contract.service";

@Controller('contract')
export class ContractController
{
    constructor (
        private readonly contractService: ContractService,
    ) {}

    @Get("/dummy")
    createDummyContract() {
        this.createDummyContract();
    }

    @Get("/:id")
    async getDetailContractById() {
        // contract + event name
        return await this.contractService.getDetailContractById()
    }

    @Get("/reject/:id")
    
    @Get("/accept/:id")

    @Post("/:id")
    editContract() {
        return
    }
    
}