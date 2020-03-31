import { Controller, Get } from "@nestjs/common";
import { ContractService } from "./contract.service";

@Controller('contract')
export class ContractController
{
    constructor (
        private readonly contractService: ContractService,
    ) {}

    @Get("/:id")
    getContractById() {
        return {
            eventId: 1,
            description: 'I perform after 4 AM and need food',
            price: 100023.2,
            status: 'Drafting',
            hireeId: 1,
            timestamp: new Date()
        }
    }
    
}