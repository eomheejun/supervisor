const express = require('express');
const router = express.Router();
const userModel = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const authcheck = passport.authenticate('jwt', {session: false});
const validateLoginInput = require('../../validation/login');


router.get('/', (req, res) => {
    res.render("login");
});

router.post('/register', (req, res) => {
    User.findOne({ id: req.body.id })
        .then(user => {
            if(user) {
                return res.status(400).json({
                    email: "해당 아이디를 가진 사용자가 존재합니다."
                })
            } else {
                const newUser = new User({
                    id: req.body.id,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }


    const id = req.body.id;
    const password = req.body.password;

    //find user by id

    userModel
        .findOne({id})
        .then(user => {
            if(!user){
                errors.id = "no user";
                res.send(`
                <script>
                var contest = alert("없는 아이디입니다.")
                if(contest === true){
                    history.back();
                }
                else{
                    history.back();
                }
                </script>
                `);
                return res.status(400).json(errors);
            }else{
                bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            res.redirect('/main');
                        }else{
                            res.send(`
                            <script>
                            var contest = alert("비밀번호를 확인해주세요.")
                            if(contest === true){
                                history.back();
                            }
                            else{
                                history.back();
                            }
                            </script>
                            `);

                        }
                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => {res.json(err)});
});
module.exports = router;