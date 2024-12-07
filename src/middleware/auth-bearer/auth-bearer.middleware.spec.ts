import { AuthBearerMiddleware } from './auth-bearer.middleware';

describe('AuthBearerMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthBearerMiddleware()).toBeDefined();
  });
});
