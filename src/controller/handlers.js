import postgresql from "../config/db.js";

class postgresqlDb {
    
    //get all the countries, their fifa rankings and the average age of their player.
    async getCountries() {
        try {
            const results = await postgresql.query(`SELECT c.country, ROUND(AVG(c.fifa_ranking)) as rank, ROUND(AVG(age)) AS average_age
                                        FROM players p INNER
                                        JOIN countries c
                                        ON c.country= p.country
                                        GROUP BY c.country`)
            let resultsWithInt = []
            for(let result of results.rows){
                if(parseInt(result.rank)!==NaN) result.rank =  parseInt(result.rank)
                if(parseInt(result.average_age)!==NaN) result.average_age =  parseInt(result.average_age)
                resultsWithInt.push(result)
            }
            return { countries: resultsWithInt }
        } catch (error) {
            console.log(`Error on getCountries function:\n Error: ${JSON.stringify(error.message)} `)
            throw error
        }
    }
    //add country
    async addCountry(countryData) {
        try {
            let errors = []
            const isCountryExist = (await this.isCountryExist(countryData.country))
            const isRateNan = (isNaN(+countryData.fifaRanking) || countryData.fifaRanking === null)

            if (isCountryExist) errors.push(`${this.capitalizeFirstCharacters(countryData.country)} name is already exist.`)
            if (isRateNan) errors.push(`Rate is required and must be valid number.`)
            if (countryData.country === null || countryData.country === undefined) errors.push('Country name is required.')

            await postgresql.query(`INSERT INTO countries (country, fifa_ranking) VALUES ($1, $2)`, [this.capitalizeFirstCharacters(countryData.country), countryData.fifaRanking])
            return { createdCountryName: `${this.capitalizeFirstCharacters(countryData.country)}`, errors };

        } catch (error) {
            console.log(`Error on addCounry function:\n Error: ${JSON.stringify(error.message)} \n Data: ${JSON.stringify(countryData)}`)
            throw error
        }
    }

    //create new players.
    async createNewPlayers(newPlayersData) {
        try {
            const errors = []
            const insertValues = []

            //check new player data
            for (let newPlayer of newPlayersData) {
                // check age - required
                const playerDataString = `Name: ${(newPlayer.name ?? 'null')}, Country :${(newPlayer.country ?? 'null')}, Age:${(newPlayer.age ?? 'null')}`
                if (isNaN(+newPlayer.age) || newPlayer.age === null) {
                    errors.push(`Age is required and must be a number. (Related Player : ${playerDataString})`)
                }
                //check country -required
                if (newPlayer.country === null || newPlayer.country === undefined) {
                    errors.push(`Country is a required field.(Related Player : ${playerDataString})`)
                }

                //check country -required
                const isNotCountryExist = !(await this.isCountryExist(newPlayer.country))
                if (isNotCountryExist && (newPlayer.country !== null && newPlayer.country !== undefined)) {
                    errors.push(`Country does not exist in our records. Please add country first. (Related Player : ${playerDataString})`)
                }
                 //prepare values for db insert
                 const newPlayerName = newPlayer.name ? `'${newPlayer.name}'` : null
                 const newPlayerCountry = newPlayer.country ? `'${this.capitalizeFirstCharacters(newPlayer.country)}'` : null
                 const newPlayerAge = newPlayer.age ? +newPlayer.age : null
                 insertValues.push((`(${newPlayerName}, ${newPlayerCountry},${newPlayerAge})`))
 
            }

            if (errors.length) {
                return { result: 'error', errors };
            } else {
                const values = `${insertValues.join(', ')}`
                await postgresql.query(`INSERT INTO players (name, country, age) VALUES ${values}`)

                return { result: 'success', errors }
            }
        } catch (error) {
            console.log(`Error on createNewPlayers function:\n Error: ${JSON.stringify(error.message)} \n Data: ${JSON.stringify(newPlayersData)}`)
            throw error
        }

    }

    capitalizeFirstCharacters(mySentence) {
        if (!mySentence) return null
        //regex used for finding each word's first letter
        return mySentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }

    async isCountryExist(countryName) {
        const recordedCountries = await postgresql.query("SELECT DISTINCT(country) FROM countries")

        return (recordedCountries.rows.some(item => {
            return item.country === this.capitalizeFirstCharacters(countryName)
        }))
    }
}

export default postgresqlDb