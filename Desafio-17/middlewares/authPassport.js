const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Usuarios = require("../data/models/usuarios");

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

function authPassport() {
  passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
      Usuarios.findOne({ username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          console.log("No existe el usuario " + username);
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          console.log("Password inválido");
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ username: username }, function (err, user) {
          if (err) {
            console.log("Error en el logueo: " + err);
            return done(err);
          }

          if (user) {
            console.log("Ya existe el usuario");
            return done(null, false);
          }

          const newUser = {
            username: username,
            password: createHash(password),
          };
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              console.log("Error al guardar el usuario: " + err);
              return done(err);
            }
            console.log(user);
            console.log("Registración exitosa");
            return done(null, userWithId);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
}

module.exports = authPassport;
