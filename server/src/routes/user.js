const express = require('express');
const httpStatus = require('http-status');
const models = require('./../models');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;

  const newUser = models.User.build({
    email,
    password,
    firstName,
    lastName,
  });

  const errors = newUser.validate();

  if (errors) {
    return res.json('fak');
  }
  return res.json('ok');
});

module.exports = router;


// exports.postSignup = function (req, res) {

   
//         token = utils.generateToken(30, 2);
//         User.create({
//           email: req.body.email,
//           password: req.body.password,
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           status: 0,
//           activationToken: token,
//           activationExpires: Date.now() + 259200000 // 72 hour
//         }).then(function (newUser) {
//           var locals = {
//             email: req.body.email,
//             subject: 'Activate account',
//             name: req.body.firstName,
//             link: ACTIVATE_END_POINT + token
//           };
//           debug("Send user email to activate account");
//           mailer.sendOne('activate_account', locals, function () {
//             res.send({msg: "CREATED_WITH_SUCCESS"});
//           });
//           postSignupRaf(req.body.recruit_token, newUser);
//         }).catch(function () {
//           debug("Error creating account");
//           res.statusCode = 400;
//           res.send("SOMETHING_WENT_WRONG");
//         });
//       }
//     });
//   }
// };
