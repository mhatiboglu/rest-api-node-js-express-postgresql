# rest-api-node-js-express-postgresql


### Getting Started

### Setup DB

- I created a postgresql database on AWS RDS to facilitate the testing process and environment preparation.

- You can check this database with pgAdmin or a similar tool and make queries.
https://www.pgadmin.org/download/

(I will send you the necessary information to access the database in question by e-mail.)

- For countries table representation;

SELECT country, fifa_ranking FROM countries

- For country table representation;

SELECT name, country, age FROM players

### Run the app locally

- git clone https://github.com/mhatiboglu/rest-api-node-js-express-postgresql.git

- Please go to .envDELETE file and rename it as .env and add POSTGRESQL_USER and POSTGRESQL_PASSWORD values from my email.

- `npm install`
- `npm run dev` - This will start the application in development mode


### Test the app locally

- I created and added an import file for POSTMAN collection. You can use this collection for testing API rouetes.
(Please check POSTMAN Collection folder.)

![alt text](https://i.ibb.co/mRxY4bj/New-Bitmap-Image.png?raw=true)

![alt text](https://i.ibb.co/G3XcDyr/New-Bitmap-Image-2.png?raw=true)
