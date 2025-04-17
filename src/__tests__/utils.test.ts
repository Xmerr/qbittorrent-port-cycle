import { getRandomPort } from '../utils.js';

describe('getRandomPort', () => {
  it('should return a number within the specified range', () => {
    const port = getRandomPort();
    expect(port).toBeGreaterThanOrEqual(49152);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it('should return different ports on multiple calls', () => {
    const ports = new Set();
    for (let i = 0; i < 100; i++) {
      ports.add(getRandomPort());
    }
    expect(ports.size).toBeGreaterThan(1);
  });
}); 