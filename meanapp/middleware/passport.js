const { options } = require("../routes")

const JwtStrategy = require("pasport-jwt").Strategy()
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'PUB_KEY',
    algorithms: ['RS256']
};
module.exports = (pasport) => {
    pasport.use(new JwtStrategy(options, (jwt_payload, done) => {
        return done(null, { name: "imran", id: 12345 })
    }))
}