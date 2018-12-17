import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageDTO } from './message.dto';
import { Message } from './message.entity';
import { InsertResult } from 'typeorm';
const uuidv4 = require('uuid/v4');

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageRepository)
        private readonly messageRepository: MessageRepository,
    ) {}

    async getMessages(): Promise<MessageDTO[]> {
        const messages = await this.messageRepository.getMessages();
        const response: Array<MessageDTO> = [];
        messages.map(msg => {
            response.push({
                id: msg.id,
                conversationId: msg.conversationId,
                from: msg.from,
                text: msg.text,
                to: msg.to,
                timestamp: msg.timestamp,
            });
        });
        return response;
    }

    async getMessagesById(id: any): Promise<MessageDTO> {
        const response = await this.messageRepository.getMessagesById(id);
        if (!response) throw new Error('mensagem não encontrada');
        const _message = new MessageDTO();
        _message.conversationId = response.id;
        _message.from = response.from;
        _message.text = response.text;
        _message.timestamp = response.timestamp;
        _message.to = response.to;
        return _message;
    }

    async getMessagesByConversationId(conversationId: any): Promise<MessageDTO[]> {
        const messages = await this.messageRepository.getMessagesByConversationId(conversationId);
        const response: Array<MessageDTO> = [];
        messages.map(msg => {
            response.push({
                id: msg.id,
                conversationId: msg.conversationId,
                from: msg.from,
                text: msg.text,
                to: msg.to,
                timestamp: msg.timestamp,
            });
        });
        return response;
    }

    async createMessage(msgDTO: MessageDTO): Promise<InsertResult> {
        if (msgDTO.conversationId == '') msgDTO.conversationId = uuidv4();
        if (msgDTO.to == '') msgDTO.to = uuidv4();
        if (msgDTO.from == '') msgDTO.from = uuidv4();
        const _msg = new Message();
        _msg.conversationId = msgDTO.conversationId;
        _msg.from = msgDTO.from;
        _msg.text = msgDTO.text;
        _msg.to = msgDTO.to;
        return await this.messageRepository.newMessage(_msg);
    }
}
