const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");
const secret = process.env.APP_SECRET;

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
    passReqToCallback: true,
};

passport.use(new JwtStrategy(option, async (req,jwt_payload, done) => {
    try {                
        const user = await User.findOne({email: jwt_payload.email});
        if (!user) {
            return done(null, false);
        }        
        done(null, user._id);
    } catch (error) {
        done(error, false);
    }

}))