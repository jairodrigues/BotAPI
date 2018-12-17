import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule, connection } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { createConnection } from 'typeorm';

describe('BotModule (e2e)', () => {
    let app: INestApplication;
    let id: '';
    let conversationId: '';

    afterAll(async () => {
        createConnection({
            name: 'connectionTest',
            type: 'mssql',
            host: connection.host,
            port: connection.port,
            username: connection.username,
            password: connection.password,
            database: 'Test',
        })
            .then(async connection => {
                const queryRunner = connection.createQueryRunner();
                await queryRunner.dropTable('message');
                await app.close();
            })
            .catch(error => console.log(error));
    });

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('api/v1/messages (POST)', async () => {
        return await request(app.getHttpServer())
            .post('/api/v1/messages')
            .send({
                conversationId: '',
                from: '',
                to: '',
                text: 'Olá, tudo bem?',
            })
            .set('Accept', 'application/json')
            .expect(201);
    });

    it('api/v1/messages (GET)', async () => {
        return await request(app.getHttpServer())
            .get('/api/v1/messages')
            .expect(200)
            .then(response => {
                id = response.body[0].id;
                conversationId = response.body[0].conversationId;
                expect(response.body[0].text).toBe('Olá, tudo bem?');
            });
    });

    it('api/v1/messages/:id (GET)', async () => {
        return await request(app.getHttpServer())
            .get(`/api/v1/messages/${id}`)
            .expect(200)
            .then(response => {
                expect(response.body.text).toBe('Olá, tudo bem?');
            });
    });

    it('api/v1/messages/:id (GET)', async () => {
        return await request(app.getHttpServer())
            .get(`/api/v1/messages/conversationId/${conversationId}`)
            .expect(200)
            .then(response => {
                expect(response.body[0].text).toBe('Olá, tudo bem?');
            });
    });
});
