import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

export const authHandlers = [
  http.post(`${env.API_URL}/api/auth/register`, async ({ request }) => {
    return HttpResponse.json(
      {
        success: true,
        message: 'Register success',
        data: {
          id: '1',
          name: 'testuser',
          email: 'testuser@example.com',
          token: 'mock-jwt-token',
        },
      },
      {
        headers: {
          'Set-Cookie': 'token=mock-jwt-token; Path=/; HttpOnly; SameSite=Strict',
        },
      },
    );
  }),
  http.post(`${env.API_URL}/api/auth/login`, async ({ request }) => {
    return HttpResponse.json(
      {
        success: true,
        message: 'Login success',
        data: {
          user: {
            id: '1',
            name: 'testuser',
            email: 'testuser@example.com',
          },
        },
      },
      {
        headers: {
          'Set-Cookie': 'token=mock-jwt-token; Path=/; HttpOnly; SameSite=Strict',
        },
      },
    );
  }),
  http.post(`${env.API_URL}/api/auth/logout`, async ({ request }) => {
    return HttpResponse.json(
      {
        success: true,
        message: 'Logout success',
      },
      {
        headers: {
          'Set-Cookie': 'token=; Path=/; HttpOnly; SameSite=Strict',
        },
      },
    );
  }),
];
