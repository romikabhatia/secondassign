/**
 * Created by ruhi on 2016-11-11.
 */

// global variables for the object holding
module.exports = {
    //db: 'mongodb://localhost/comp2068-thu',
    db: 'mongodb://romika786:navjot786@ds050189.mlab.com:50189/lesson8',
    secret: 'Some random string used to salt 123',
    ids: {
        facebook:{
            clienID: '1647432255551258',
            clientSecret :'8e9b2ec712d53e69426c019431a4438d',
            callbackURL: 'http://localhost:3000/facebook/callback'
        },
        github: {
            clientID: '97300a3d6b65f3219bf8',
            clientSecret: 'a6fed60d2c06b378dbf9e4a9a707c99d66a0ff35',
            callbackURL: 'http://localhost:3000/github/callback'
        }

    }
};