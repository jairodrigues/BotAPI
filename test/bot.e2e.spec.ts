import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('BotModule (e2e)', () => {
    let app: INestApplication;
    let id: '';

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('api/v1/bot (POST)', async () => {
        return await request(app.getHttpServer())
            .post('/api/v1/bot')
            .send({
                name: 'TestNameBot',
            })
            .set('Accept', 'application/json')
            .expect(201);
    });

    it('api/v1/bot (GET)', async () => {
        return await request(app.getHttpServer())
            .get('/api/v1/bot')
            .expect(200)
            .then(response => {
                id = response.body[0].id;
                expect(response.body[0].name).toBe('TestNameBot');
            });
    });

    it('api/v1/bot/:id (GET)', async () => {
        return await request(app.getHttpServer())
            .get(`/api/v1/bot/${id}`)
            .expect(200)
            .then(response => {
                expect(response.body.name).toBe('TestNameBot');
            });
    });

    it('api/v1/bot/:id (UPDATE)', async () => {
        return await request(app.getHttpServer())
            .put(`/api/v1/bot/${id}`)
            .send({ name: 'testeNameBotUpdate' })
            .expect(201);
    });

    it('api/v1/bot/:id (DELETE)', async () => {
        return await request(app.getHttpServer())
            .delete(`/api/v1/bot/${id}`)
            .expect(200);
    });
});
