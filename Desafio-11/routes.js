
function getRoot (req, res) {
    res.render("inicio.hbs", {title: "E-commerce", username: req.session.user});
  }
  
  
function getShowsession (req, res) {
    res.json(req.session);
  }
  
function getLogout (req, res) {
    const user = req.session.user
    req.session.destroy((err) => {
      if (err) {
        res.send("no pudo deslogear");
      } else {
        res.render("logout", {name: user, layout : "logout"} )
      }
    });
  }
  
  
// function getLogin(req, res) {
  
//     res.render("login", {title: "Login", layout : "login"} )
    
//   }
  function getLogin(req, res) {
    if (req.isAuthenticated()) {
      const { username, password } = req.user;
      // const user = { username, password };
      res.render("inicio.hbs", { username: req.session.user });
    } else {
      res.render("login", {title: "Login", layout : "login"});
    }
  }
  

  function getRoot (req, res) {
    res.render("inicio.hbs", {title: "E-commerce", username: req.session.user});
  }



async function getRegistro(req, res) {
  res.render("login", {title: "Registro", layout : "registro"} )
  
}
async function getFailLogin(req, res) {
  res.render("faillogin", {layout : "faillogin"} )
  
}
async function getFailSignup(req, res) {
  res.render("failsignup", {layout : "failsignup"} )
  
}
  
  
  
async function postLogin(req, res) {
    console.log(req.body)
    const { username, password } = await req.body;
    req.session.user = username;
    req.session.admin = true;
    res.redirect("/");
    
  }

  async function postRegistro(req, res) {
    console.log(req.body)
    const { username, password } = await req.body;
    req.session.user = username;
    req.session.admin = true;
    res.redirect("/");
    
  }
  
function getPrivado (req, res) {
    res.send(
      `si estas viendo esto es porque ya te logueaste, sos admin y sos ${req.session.user}!`
    );
  }
  
module.exports = {
    getRoot,
    getShowsession,
    getLogout,
    getLogin,
    postLogin,
    getPrivado,
    getRegistro,
    postRegistro,
    getFailLogin,
    getFailSignup
}