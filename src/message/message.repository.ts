import { Repository, EntityRepository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    async newMessage(message: Message) {
        return await this.insert(message);
    }

    async getMessages() {
        return await this.find();
    }

    async getMessagesById(id: any) {
        return await this.findOne(id);
    }

    async getMessagesByConversationId(conversationId: any) {
        return await this.find({ where: { conversationId: conversationId } });
    }
}
