const express = require('express');
const router = express.Router();
const passport = require("passport");
const siteModel = require("../../models/site");
const authcheck = passport.authenticate('jwt', {session: false});
const validateSiteInput = require('../../validation/site_validation');

//몽고디비에 등록된 site schema를 찾아와서 site길이만큼 for문을 돌려
//list에 site스키마중 name을 집어넣고 main.jade로 변수를 보내준다
router.get('/', (req, res) => {
    siteModel.find(function(error, site){
        if(error){
            console.log(error);
        }else{
            global.list = [];
            for(var i=0;i<site.length;i++)
            {
                list.push(site[i].name);
            }
            res.render("main",{Site:list});

        }
    })
});
router.get('/ajax', (req, res) => {
    siteModel.find(function(error, site){
        if(error){
            console.log(error);
        }else{
            global.list = [];
            for(var i=0;i<site.length;i++)
            {
                list.push(site[i].name);
            }
            res.render("ajax",{Site:list});

        }
    })
});

router.get('/site/:name',(req, res)=>{
    Site.findOne({name:req.params.name})
        .then(site => {
            if(!site){
                res.status(400).json({
                    err:"등록된 회사가 없습니다."
                })
            }
            else{
                var data = {
                    Site:list,
                    name:site.name,
                    information:site.information,
                    manager:site.manager,
                    channel:site.channel,
                    configtype:site.configtype,
                    project_term1:site.term[0].project_term1,
                    project_term2:site.term[0].project_term2,
                    install_day:site.term[0].install_day,
                    test_term1:site.term[0].test_term1,
                    test_term2:site.term[0].test_term2,
                    open_day:site.term[0].open_day
                }
                res.json({
                    Site:list,
                    name:site.name,
                    information:site.information,
                    manager:site.manager,
                    channel:site.channel,
                    configtype:site.configtype,
                    project_term1:site.term[0].project_term1,
                    project_term2:site.term[0].project_term2,
                    install_day:site.term[0].install_day,
                    test_term1:site.term[0].test_term1,
                    test_term2:site.term[0].test_term2,
                    open_day:site.term[0].open_day
                });
            }
        })
        .catch(err => res.json(err));
});

router.get('/create', (req,res) => {
    res.render("create");
});

router.post('/create' , (req, res) => {
    
    const {errors, isValid} = validateSiteInput(req.body);
    if(!isValid){
        return res.send(`
        <script>
        var contest = alert("비어있는 항목을 전부 채워주세요")
        if(contest === true){
            history.back();
        }
        else{
            history.back();
        }
        </script>
        `
        );
        
    }
    else{
        siteModel
            .findOne({name: req.body.name})
            .then(site => {
                if(site){
                    return res.send(`
                    <script>
                    var contest = alert("회사가 존재합니다.")
                    if(contest === true){
                        history.back();
                    }
                    else{
                        history.back();
                    }
                    </script>
                    `
                    );
                }
                else{
                    const newSite = new Site({
                        name:req.body.name,
                        information:req.body.information,
                        manager:req.body.information,
                        channel:req.body.channel,
                        configtype:req.body.configtype,
                        term:[
                            {
                                project_term1:req.body.project_term1,
                                project_term2:req.body.project_term2,
                                install_day:req.body.install_day,
                                test_term1:req.body.test_term1,
                                test_term2:req.body.test_term2,
                                open_day:req.body.open_day
                            }
                        ]
                    })
                    console.log(newSite)
                    newSite.save()
                    .then(res.redirect("/main"))
                    .catch(err => console.log(err));
                }
            })
            .catch(err=>res.json(err));
    }
});

router.get('/ajax/create', (req,res) => {
    res.render("create");
});

router.post('/ajax/create' , (req, res) => {
    const {errors, isValid} = validateSiteInput(req.body);
    const data = req.body;
    const error = "Error";
    if(!isValid){
        return res.send(error);
    }
    else{
        siteModel
            .findOne({name: req.body.name})
            .then(site => {
                if(site){
                    return res.send(error);
                }
                else{
                    const newSite = new Site({
                        name:req.body.name,
                        information:req.body.information,
                        manager:req.body.information,
                        channel:req.body.channel,
                        configtype:req.body.configtype,
                        term:[
                            {
                                project_term1:req.body.project_term1,
                                project_term2:req.body.project_term2,
                                install_day:req.body.install_day,
                                test_term1:req.body.test_term1,
                                test_term2:req.body.test_term2,
                                open_day:req.body.open_day
                            }
                        ]
                    })
                    newSite.save()
                    .then(res.send(data))
                    .catch(err => console.log(err));
                }
            })
            .catch(err=>res.json(err));
    }
 

});

router.post('/site/delete/:name',  (req, res) => {
    const name = req.params.name;
    siteModel
        .remove({name:name})
        .exec()
        .then(res.redirect("/main"))
        .catch(err => {
            res.json(err)
            res.status(500).json({
                err: err
            });
        });
});
            
router.post('/site/update/:name', (req,res) =>{
    Site.findOne({name:req.params.name})
        .then(site => {
            if(!site){
                res.status(400).json({
                    err:"등록된 회사가 없습니다."
                })
            }
            else{
                res.render("update", {
                    Site:list,
                    name:site.name,
                    information:site.information,
                    manager:site.manager,
                    channel:site.channel,
                    configtype:site.configtype,
                    project_term1:site.term[0].project_term1,
                    project_term2:site.term[0].project_term2,
                    install_day:site.term[0].install_day,
                    test_term1:site.term[0].test_term1,
                    test_term2:site.term[0].test_term2,
                    open_day:site.term[0].open_day
                });
            }
        })
        .catch(err => res.json(err));
})

router.post('/site/recreate/:name' , (req, res) => {
    const name = req.params.name
    siteModel
        .updateMany({name:name}, {$set:{
            name:req.body.name,
            information:req.body.information,
            manager:req.body.information,
            channel:req.body.channel,
            configtype:req.body.configtype,
            term:[
                {
                    project_term1:req.body.project_term1,
                    project_term2:req.body.project_term2,
                    install_day:req.body.install_day,
                    test_term1:req.body.test_term1,
                    test_term2:req.body.test_term2,
                    open_day:req.body.open_day
                }
            ]
        }})
        .exec()
        .then(result => {
            res.redirect("/main")
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;