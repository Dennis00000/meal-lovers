import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  jwtCookieExpire: process.env.JWT_COOKIE_EXPIRE || 30,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_51R7EZ0POni7R48xAZ0boQ2wqykzpwq1yt8q03IPmkW7yi7qYlOvONuvI4zZt961UaiK7zLEDfUE3I9zcSKrBkTYx00QCX7K8Wy',
  emailService: process.env.EMAIL_SERVICE,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailFrom: process.env.EMAIL_FROM
}; 