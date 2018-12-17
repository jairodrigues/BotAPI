import { Get, Controller, Post, Body, Res, HttpStatus, HttpException, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './message.dto';
import { ApiUseTags, ApiImplicitParam, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Messages')
@Controller('api/v1/messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    async get(@Res() res): Promise<MessageDTO[]> {
        try {
            const messages = await this.messageService.getMessages();
            return res.status(HttpStatus.OK).json(messages);
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
    async getById(@Param('id') id, @Res() res): Promise<MessageDTO[]> {
        try {
            const message = await this.messageService.getMessagesById(id);
            return res.status(HttpStatus.OK).json(message);
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

    @Get('/conversationId/:conversationId')
    @ApiImplicitParam({ name: 'conversationId' })
    async getByConversationId(@Param('conversationId') conversationId: any, @Res() res): Promise<MessageDTO[]> {
        try {
            const messages = await this.messageService.getMessagesByConversationId(conversationId);
            return res.status(HttpStatus.OK).json(messages);
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
    async create(@Body() msgDTO: MessageDTO, @Res() res) {
        try {
            await this.messageService.createMessage(msgDTO);
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
