import { Controller, Get, Post, Param, HttpException, HttpStatus, UseGuards, UsePipes, ValidationPipe, Body, Req } from "@nestjs/common";
import { ContractService } from "./contract.service";
import { UpdateContractDto } from "./dto/update-contract-dto";
import { AuthGuard } from "@nestjs/passport";

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

    @UseGuards(AuthGuard("jwt"))
    @Get("/send/:id")
    async sendContract(@Param('id') eventId, @Req() req): Promise<any> {
        const userId = req.user.userId;
        // contract + event name
        try {
            await this.contractService.sendContractById( eventId,userId );
            return {
                status: 200,
                message: "ok"
            };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/accept/:id")
    async acceptContract(@Param('id') eventId, @Req() req): Promise<any> {
        const userId = req.user.userId;
        // contract + event name
        try {
            await this.contractService.acceptContractById(eventId, userId);
            return {
                status: 200,
                message: "ok"
            };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/reject/:id")
    async rejectContract(@Param('id') eventId, @Req() req): Promise<any> {
        const userId = req.user.userId;
        // contract + event name
        try {
            await this.contractService.rejectContractById(eventId, userId);
            return {
                status: 200,
                message: "ok"
            };
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
    // TODO check if editor is user
    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post("/:id")
    async editContract(@Param('id') eventId, @Body() editContract: UpdateContractDto ): Promise<any> {
        try {
            await this.contractService.editContract(eventId, editContract);
            return {
                status: 200,
                message: "ok"
            };
        } catch (err)
        {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    
    
}