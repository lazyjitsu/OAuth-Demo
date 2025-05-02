const request = require('supertest');
const app = require('../../app')
const {mongoConnect,mongoDisconnect} = require('../../services/mongo')

describe('Launches API', () => {
    // Whatever is int his callback will run once to setup all the tests that come after.

    beforeAll(async () => {
        await mongoConnect();
    })

    afterAll(async() => {
        await mongoDisconnect();
    })
    describe('Test GET /launches', () => {
        test('It should respond with 200 success and headers-json', async () => {
            const response = await request(app)
                                .get('/launches')
                                .expect('Content-type',/json/)
                                .expect(200);
        })
    })
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'July 12, 2027'
        };
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler 14',
        };
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler 14',
            launchDate:'blahblah'
        };
        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type',/json/)
                .expect(201);
    
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
    
        expect(responseDate).toBe(requestDate);
        expect(responseDate).toBe(requestDate);
         // using jest assertions
        //  expect(response.body).toMatchObject({launchDataWithoutDate})
        })
    
        test('It should catch missing required properties', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type',/json/)
            .expect(400);
        //Jest
        expect(response.body).toStrictEqual({
             error: 'Missing required launch property'
        });
    });
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type',/json/)
            .expect(400);
        //Jest
        expect(response.body).toStrictEqual({
            error: 'Invalid launch datee'
        });
        })
    })
})

