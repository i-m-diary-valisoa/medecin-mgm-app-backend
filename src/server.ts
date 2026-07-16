import app from './app';
import { env } from './config/env';

const startServer = () => {
  try {
    app.listen(Number(env.PORT), '0.0.0.0', () => {
      console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
