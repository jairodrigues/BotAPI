import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotModule } from './bot/bot.module';
import { MessageModule } from './message/message.module';

export const connection = {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'sa',
    password: 'Acesso@2018',
    synchronize: true,
    logging: false,
    database: process.env.NODE_ENV === 'test' ? 'Test' : 'BotAPI',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/migrations/*.migration{.ts,.js}'],
};

@Module({
    imports: [TypeOrmModule.forRoot(this.connection), BotModule, MessageModule],
})
export class AppModule {}
