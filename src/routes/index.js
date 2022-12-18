import express from "express"
import db from '../controller/handlers.js';

const router = express.Router();

//Get all todos.
router.use('/countries', async (req, res) => {
    const redirectStatus = req.query.redirectStatus
    try {
        const { countries } = await new db().getCountries()
        res.status(redirectStatus ? 308 : 200)
        res.json(countries)
    } catch (error) {
        res.status(500)
        res.json(formatErrorMsg(error))
    }
});

router.post('/country', async (req, res) => {

    try {
        const { countryData } = req.body
        const { createdCountryName, errors } = await new db().addCountry(countryData)
        if (errors.length) {
            res.status(400)
            res.json({ errors })
        } else {
            res.status(201)
            res.json({ result: `Country (${createdCountryName}) is added successfully` })
        }

    } catch (error) {
        res.status(500)
        res.json(formatErrorMsg(error))
    }
});

//Get all todos.
router.post('/players', async (req, res) => {
    const { newPlayersData } = req.body
    try {
        const { result, errors } = await new db().createNewPlayers(newPlayersData)
        if (errors.length) {
            res.status(400)
            res.json({ errors })
        } else {
            res.redirect(308, '/countries?redirectStatus=true')
            /*
            const { countries } = await new db().getCountries()
            res.status(200)
            res.json(countries)
            */
        }
    } catch (error) {
        res.status(500)
        res.json(formatErrorMsg(error))
    }
});

function formatErrorMsg(error) {
    return ({ errors: error.message })
}

export default router