import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export const passportSetup = () => {
    passport.use(
        new GoogleStrategy(
            {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
            },
            function (accessToken, refreshToken, profile, done) {
            done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
