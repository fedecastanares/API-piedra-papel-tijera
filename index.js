console.log('Levantando server');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

let dataBaseConnectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xut0w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const app = express();
app.use(express.json({ extended: true}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


const checkIfTheUserHasCredentials = require('./middlewares/checkIfTheUserHasCredentials');
const checkIfTheUserIsAdmin = require('./middlewares/checkIfTheUserIsAdmin.js');

app.get('/', (req, res) => {res.send('El servidor esta corriendo')});

app.get('/players', require('./controllers/games/players'));

app.post('/login', require('./controllers/users/login'));

app.post('/register', require('./controllers/users/register'));

mongoose.connect(dataBaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error) => {
        if (error) {
            console.error('No fue posible conectarse a la base de datos', error)
        } else {
            // Comenzar a escuchar por conexiones
            app.listen(process.env.PORT, () =>
                console.log(`;) Servidor corriendo en el puerto: ${process.env.PORT}`)
            )
        }
    });