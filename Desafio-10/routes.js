
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
  
  
function getLogin(req, res) {
  
    res.render("login", {title: "Login", layout : "login"} )
    
  }
  
  
  
async function postLogin(req, res) {
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
    getPrivado
}