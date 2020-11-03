const express = require('express');
const dotenv = require('dotenv');
const getClientData = require('./helper/getClientData');

const app = express();

//load applicaiton config
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 3214;

//middleware
app.use(express.json());

//endpoints, we can use routers too
app.post('/api/v1|v2/parse', async (req, res, next) => {
    try {
        if (req.body && req.body.data) {
            const data = req.body.data || '';
            const versionReg = /v[0-9]+/g;
            const version = req.originalUrl.match(versionReg)[0];
            const clientData = getClientData(data, version);
            res.json(clientData);
        }
        else res.status(400).send(`please check the req body`).end();
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.use((req, res) => {
    let error = {};
    error.errorMessage = `${req.originalUrl} is not a valid url`
    error.status = 404;
    res.json(error);
})

app.use((error, req, res) => {
    res.send(error);
})

app.listen(PORT, console.log(`appliaction running on port: ${PORT} in ${process.env.NODE_ENV} environment`));