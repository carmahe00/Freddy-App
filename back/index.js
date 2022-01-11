const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const { userRouter, thirdRouter } = require('./routers');

require('dotenv').config();

const app = express()
//CORS
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/users', userRouter);
app.use('/api/thirds', thirdRouter);

const __dirnamePath = path.resolve()
//ruta pública para acceso a archivos
app.use('/uploads', express.static(path.join(__dirnamePath, '/uploads')))

app.listen(process.env.PORT, async () => {
    console.log(`Server up on http://localhost:${process.env.PORT}`)
    try {
        await sequelize.authenticate();
        console.log('Base de datos sincronizada!')
    } catch (error) {
        console.log('**** Error ****')
        console.error(error)
    }

});
