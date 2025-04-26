import { test, expect, APIRequestContext, request } from '@playwright/test';

// Declare a variable to store the API request context
let reqContext: APIRequestContext;

// beforeAll hook to create the API context once
test.beforeAll(async () => {
    reqContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
    });
});

// Test: Update a booking using PUT request
test('PUT call using request fixture', async () => {
    const response = await reqContext.put('/booking/1021', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        data: JSON.stringify({
            firstname: 'Tejas',
            lastname: 'Ghate',
            totalprice: 1000,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-01-01',
                checkout: '2025-02-01',
            },
            additionalneeds: 'Dinner',
        }),
    });

    const data = await response.json();
    console.log(data);

    // Validate status code
    expect(response.status()).toBe(200);

    // Validate the updated booking details
    expect(data).toMatchObject({
        firstname: 'Tejas',
        lastname: 'Ghate',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-01-01',
            checkout: '2025-02-01',
        },
        additionalneeds: 'Dinner',
    });

    const getCall = await reqContext.get('/booking/2021');
    console.log(getCall.json());
});


// --- Using request fixture directly ---

test('PUT call using request fixture', async ({ request }) => {
    const response = await request.put('https://restful-booker.herokuapp.com/booking/1021', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        data: JSON.stringify({
            firstname: 'Tejas',
            lastname: 'Ghate',
            totalprice: 1000,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-01-01',
                checkout: '2025-02-01',
            },
            additionalneeds: 'Dinner',
        }),
    });

    const data = await response.json();
    console.log('Using request fixture:', data);

    expect(response.status()).toBe(200);
    expect(data).toMatchObject({
        firstname: 'Tejas',
        lastname: 'Ghate',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: '2025-01-01',
            checkout: '2025-02-01',
        },
        additionalneeds: 'Dinner',
    });
});