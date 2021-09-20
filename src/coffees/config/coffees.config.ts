import { registerAs } from '@nestjs/config';

/* /src/coffees/coffees.config.ts File */
export default registerAs('coffees', () => ({
  // 👈
  foo: 'bar', // 👈
}));
