import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { authListener } from './services/auth_state_listener.js'
import { getAuth, signOut, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth"
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const app = express()
let httpServer = http.createServer(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))

authListener()
const port = process.env.PORT || 4000

const corsOptions = {
    origin: ['http://127.0.0.1:4000', 'http://127.0.0.1:8080', 'http://localhost:4000', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:8080'],
    credentials: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS'
}
app.use(cors(corsOptions))

import { reservationRoutes } from './api/reservation/reservation.routes.js'
import { courtRoutes } from './api/court/court.routes.js'
import { eventRoutes } from './api/event/event.routes.js'
import { instructorRoutes } from './api/instructor/instructor.routes.js'
import admin from 'firebase-admin'

import { serviceAccount } from './.key.service.js'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sela-flutter-auth-default-rtdb.firebaseio.com/"
})

app.post('/signup', async(req, res) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        res.json(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.json(error)
        // ..
    });
})

app.post('/signin', async(req, res) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        res.json(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        res.json(error)
      });
})

app.post('/signout', async(req, res) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        res.end(JSON.stringify({ "result": 0 }))
        console.log("Sign-out successful.")
    }).catch((error) => {
        res.end(JSON.stringify({ "result": 1 }))
    })
});


function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
            next()
        }).catch(() => {
            res.status(403).send('Unauthorized')
        });
    } else {
        res.status(403).send('Unauthorized')
    }
}

app.use('/', checkAuth)
app.use('/reservations', reservationRoutes)
app.use('/courts', courtRoutes)
app.use('/events', eventRoutes)
app.use('/instructors', instructorRoutes)

app.get('/**', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

httpServer.listen(port, () => {
    console.log(`Court reservation app listening on port ${port}`)
})
