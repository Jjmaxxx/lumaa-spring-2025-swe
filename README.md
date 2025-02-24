
1. Ensure your .env for both the frontend and backend folders have the same keys as their respective example.env files, and ensure each has an expected value.
2. POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT are used to setup the Docker container for PostgreSQL. JWT_SECRET is used to sign the JWT the backend sends to the frontend. All else can be kept the same as the example.env
3. To run the backend and database, cd into the backend folder and run "npm run start:dev". If you need to restart the dockerized database run "npm run restart:db"
4. To run the frontend, cd into the frontend folder and run "npm start".

I expect a monthly salary of $1,600, based on a rate of $20 per hour for a 20-hour work week (4 weeks per month).