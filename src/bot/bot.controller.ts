import { Get, Controller, Post, Body, Res, HttpStatus, HttpException, Put, Delete, Param } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotDTO } from './bot.dto';
import { ApiUseTags, ApiImplicitParam, ApiCreatedResponse, ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Bots')
@Controller('api/v1/bot')
export class BotController {
    constructor(private readonly botService: BotService) {}

    @Get()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async get(@Res() res): Promise<BotDTO[]> {
        try {
            const bots = await this.botService.getBots();
            return res.status(HttpStatus.OK).json(bots);
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.PRECONDITION_FAILED,
                    error: err.message,
                },
                403,
            );
        }
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id' })
    async getById(@Param('id') id, @Res() res): Promise<BotDTO[]> {
        try {
            const bot = await this.botService.getBotById(id);
            return res.status(HttpStatus.OK).json(bot);
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.PRECONDITION_FAILED,
                    error: err.message,
                },
                403,
            );
        }
    }

    @Put(':id')
    @ApiImplicitParam({ name: 'id' })
    async updateBot(@Param('id') id, @Body() botDto: BotDTO, @Res() res) {
        try {
            const bot = await this.botService.updateBot(id, botDto);
            return res.status(HttpStatus.CREATED).json(bot);
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.PRECONDITION_FAILED,
                    error: err.message,
                },
                403,
            );
        }
    }

    @Delete(':id')
    @ApiImplicitParam({ name: 'id' })
    async deleteBot(@Param('id') id, @Res() res) {
        try {
            const bot = await this.botService.deleteBot(id);
            return res.status(HttpStatus.OK).json(bot);
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.PRECONDITION_FAILED,
                    error: err.message,
                },
                403,
            );
        }
    }

    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async create(@Body() botDto: BotDTO, @Res() res) {
        try {
            await this.botService.createBot(botDto);
            return res.status(HttpStatus.CREATED).send();
        } catch (err) {
            throw new HttpException(
                {
                    status: HttpStatus.PRECONDITION_FAILED,
                    error: err.message,
                },
                403,
            );
        }
    }
}
