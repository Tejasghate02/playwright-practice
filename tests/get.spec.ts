import { test, request, expect, APIRequestContext } from '@playwright/test';

// Declare a variable to store the API request context
let reqContext: APIRequestContext;

// This hook runs before all tests
test.beforeAll(async () => {
    // Create a new API request context with baseURL set
    reqContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            Accept: 'application/json'
        }
    });
});

// Test 1: Making a GET request directly using the request fixture
test('GET using request fixture', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking', {
        headers: {
            Accept: 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);

    // Assert that the response is successful
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

// Test 2: Making a GET request using the request context created inside the test
test('GET using request context', async () => {
    // Reuse the API context created in beforeAll
    const response = await reqContext.get('/booking');
    const data = await response.json();
    console.log(data);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('Adding params in get request ', async () => {
    const response = await reqContext.get('/booking', {
        params: {
            firstName: 'john',
            lastName: 'smith'
        }
    });

    const data
        = await response.json();
    console.log(data);
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
})