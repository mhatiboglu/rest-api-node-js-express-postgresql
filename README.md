# rest-api-node-js-express-postgresql


### Getting Started

### Setup DB

- I created a postgresql database on AWS RDS to facilitate the testing process and environment preparation.

- You can check this database with pgAdmin or a similar tool and make queries.
https://www.pgadmin.org/download/

(I will send you the necessary information to access the database in question by e-mail.)

- For countries table representation;
```
SELECT country AS Country, fifa_ranking AS "Fifa Ranking" FROM countries
```
![alt text](https://i.ibb.co/84xxK2G/thumbnail-Screenshot-2022-12-19-at-07-46-08-1.png?raw=true)
- For players table representation;
```
SELECT name AS "Player Name", country AS "Player Team", age AS "Age" FROM players
```
![alt text](https://i.ibb.co/422w5T6/thumbnail-Screenshot-2022-12-19-at-07-51-17.png?raw=true)

### Run the app locally

- git clone https://github.com/mhatiboglu/rest-api-node-js-express-postgresql.git

- Please go to .envDELETE file and rename it as .env and add POSTGRESQL_USER and POSTGRESQL_PASSWORD values from my email.
```
- `npm install`
```
```
- `npm run dev` - This will start the application in development mode
```


### Test the app locally

- I created and added an import file for POSTMAN collection. You can use this collection for testing API rouetes.
(Please check POSTMAN Collection folder.) (https://www.postman.com/downloads/)

![alt text](https://i.ibb.co/v1BXpcR/New-Bitmap-Image.png?raw=true)

![alt text](https://i.ibb.co/gdP1XSG/New-Bitmap-Image-2.png?raw=true)

![alt text](https://i.ibb.co/mq335bj/New-Bitmap-Image-3.png?raw=true)



### Assumptions

- Due to the expression below, when the /players route was completed successfully, I redirected to the /countries endpoint as a result. Normally, in this kind of situation, I would prefer to make a response with a statement indicating that the creation was successful and the updated averages info. (Example
{ playersCreationResult: 'success,
  updatedAgeAvarage : {...}
})

"When new players are added in the players table through the /players API endpoint , the /countries endpoint should return the updated average age."

- When creating Players, I evaluated that there would be no countryless players.
- If the specified country is not in the countries table while creating players, I assumed that it should be to countries table first. (that's why I created a route to add country (/company). You can test it too when you import the Postman collection)

