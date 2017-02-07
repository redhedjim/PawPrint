module.exports = function() {
    var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;



    passport.use(new LocalStrategy((username, password, done) => {
        let User = require('models/user.js');

        User.forge({email: email}).fetch().then(function(user, err) {
            if(user) 
            {
                if(user.get('password') === user.encrypt(password))
                {
                    //everything matches
                    authToken = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: '7d'
                    });
                    return done(null, user);
                }
                else
                {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            }
            else
            {
                 return done(null, false, { message: 'Incorrect username.' });
            }
        });
    }
    ));

    return passport;
}

