Nest.js Backend, TypeScript + React.js Frontend, Dockerized PostgreSQL DB

1. CD into your frontend folder and run "npm install". Next, CD into your backend folder and run "npm install". Recommended to use 2 terminals for this.
2. Create a .env file for both the frontend and backend folder and ensure they have the same format and expected values as their respective example.env files.
3. POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT are used to setup the Docker container for PostgreSQL. JWT_SECRET is used to sign the JWT the backend sends to the frontend. All else can be kept the same as the example.env
4. To run the backend and database, cd into the backend folder and run "npm run start:dev". If you need to restart the dockerized database run "npm run restart:db"
5. To run the frontend, cd into the frontend folder and run "npm start".

I expect a monthly salary of $1,600, based on a rate of $20 per hour for a 20-hour work week (4 weeks per month).