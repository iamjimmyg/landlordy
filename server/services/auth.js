const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');
const Company = mongoose.model('company')

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, 'Invalid Credentials'); }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, 'Invalid credentials.');
    });
  });
}));

function updateCompany(companyId, userId, fullName){
  return Company.findById(companyId)
    .then(company => {
      console.log('please work',[company, userId, fullName])
      company.users.push(userId)
      company.assistants.push(fullName)
      company.save()
    })
}

// function updateUser(company){
//   return User.findById(company.users[0])
//     .then(user => {
//       user.companyId = company.id
//       user.save(function(err){
//         if(err) throw new Error('user did not update company')
//       })
//     })
// }

function addCompany(companyName, userId){
  //const company = new Company({companyName, userId})
  return Company.findOne({companyName})
    .then(company => {
      if(company === null){
        const newCompany = new Company({companyName, userId})
        newCompany.users.push(userId)
        newCompany.save(function (err){
          if(err) throw new Error('Company did not save')
        })
        //updateUser(newCompany)
        return newCompany
      }else if(company.companyName === companyName) {
        throw new Error('This company already exists')
      }
    })
}

function signupAssistant({ fullName, email, password, companyId, req }) {
  console.log('yo')
  const user = new User({ fullName, email, password, req })
  if(!email || !password) { throw new Error('You must provide an email and password') }
  return User.findOne({ email })
    .then(existingUser => {
      if(existingUser) { throw new Error('Email in use') }
      user.companyId = companyId
      user.isAdmin = false
      console.log(user)
      updateCompany(companyId, user.id, user.fullName)
      console.log('oh snap new assistant acount created!')
      return user.save()
    })
}

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
function signup({ fullName, email, password, companyName, req }) {
  const user = new User({ fullName, email, password, isAdmin: true });
  if (!email || !password || !companyName ) { throw new Error('You must provide an email, password, and company name.'); }


  //console.log(company)
  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) { throw new Error('Email in use'); }
      const newCompany = new Company({companyName, userId: user.id})
      newCompany.users.push(user.id)
      user.companyId = newCompany.id
      user.companyName = companyName
      newCompany.save()
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) { reject(err); }
          resolve(user);
        });
      });
    });
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials.') }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login, signupAssistant };
