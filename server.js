const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const session = require('express-session')
require("dotenv").config();
const passport = require('passport')
const client = require("./db/conn")
const markingRoute = require('./routes/markingroute')

const GoogleStrategy = require("passport-google-oauth20").Strategy

app.use(
  cors({
    origin: "https://stopwatch-app.onrender.com",
    credentials: true,
  })
);

app.use(express.json())

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 27 * 7
  }
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  gId = user.id;
  return done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  let db_connect = client.db("audiomarking");
  db_connect.collection("users").findOne({
    googleId: userId,
  }, function (err, doc) {
    if (err) throw err;
    console.log(doc)
    return done(null, doc)
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      (async function () {
        let db_connect = await client.db("audiomarking");
        db_connect.collection("users").updateOne({ googleId: profile.id },
          {
            $setOnInsert: {
              googleId: profile.id,
              username: profile.displayName,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              image: profile.photos[0].value
            },
          },
          { upsert: true });
      })();
      cb(null, profile);
    }
  )
)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get("/", (req, res) => {
    res.send("Server is running");
  });
}



app.set("trust proxy", 1)

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ['profile'] })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://stopwatch-app.onrender.app",
    session: true,
  }),
  function (req, res) {
    res.redirect("https://stopwatch-app.onrender.app");
  }
);

app.get("/getuser", (req, res) => {
  res.send(req.user)
})

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      res.redirect(200, "/")
    })
  }
})

app.use('/api', markingRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at ${process.env.PORT}!`)
})

