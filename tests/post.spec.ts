import { test, expect, request, APIRequestContext } from '@playwright/test';
import jsonData from '../tests-data/post.json';

// Declare a variable to hold the request context
let reqContext: APIRequestContext;

// Setup before all tests
test.beforeAll(async () => {
  reqContext = await request.newContext({
    baseURL: 'https://restful-booker.herokuapp.com', 
  });
});

// --- POST request using request context ---
test('POST request using request context', async () => {
  const response = await reqContext.post('/booking', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      firstname: 'Tejas',
      lastname: 'Ghate',
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-01-01',
      },
      additionalneeds: 'Breakfast',
    }),
  });

  const data = await response.json();
  console.log('Booking ID (request context):', data.bookingid);

  expect(response.status()).toBe(200);
  expect(data.booking).toMatchObject({
    firstname: 'Tejas',
    lastname: 'Ghate',
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-01',
    },
    additionalneeds: 'Breakfast',
  });
});

// --- POST request using request fixture ---
test('POST request using request fixture', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      firstname: 'Tejas',
      lastname: 'Ghate',
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-01-01',
      },
      additionalneeds: 'Breakfast',
    }),
  });

  const data = await response.json();
  console.log('Booking ID (request fixture):', data.bookingid);

  expect(response.status()).toBe(200);
  expect(data.booking).toMatchObject({
    firstname: 'Tejas',
    lastname: 'Ghate',
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-01',
    },
    additionalneeds: 'Breakfast',
  });
});

// --- POST request using external JSON ---
test('POST request using external JSON file', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(jsonData.postData),
  });

  const data = await response.json();
  console.log('Booking ID (external JSON):', data.bookingid);

  expect(response.status()).toBe(200);

  expect(data.booking).toMatchObject(jsonData.postData);
});
