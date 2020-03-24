const express = require('express')
const app = express()
const passport = require("passport")
const SamlStrategy = require("passport-saml").Strategy

passport.use(new SamlStrategy(
  {
    path: '/login/callback',
    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml'
  },
  function (profile, done) {
    findByEmail(profile.email, function(err, user) {
      if (err) {
        return done(err);
      }
      return done(null, user);
    });
  })
);

app.listen(8080, () => {
    console.log('Server running boi')
 
})

app.get('/', (req, res) => {
    console.log('OH MA GOD')
    res.send('OH MA GOD')
})

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);