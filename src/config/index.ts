import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    open_router_api_key: process.env.OPEN_ROUTER_API_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_success_url: process.env.STRIPE_SUCCESS_URL,
    stripe_cancel_url: process.env.STRIPE_CANCEL_URL,
}