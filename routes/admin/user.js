var express = require('express');
var router = express.Router();
var mysql=require("../common/mysql");
var md5=require("../common/md5");

router.get("/add",function (req,res) {
    res.render("admin/user");
})
router.get("/show",function (req,res) {
    mysql.query("select * from admin",function (err,result) {
        if(err){
            console.log("select error");
        }else{
            res.render("admin/userShow",{info:result});
        }
    })
})
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    mysql.query(`delete from admin where id=${id}`,function (err,result) {
        if(err){
            console.log("delete error");
        }else{
            if(result.affectedRows>0){
                res.redirect("/user/show");
            }
        }
    })
})
router.get("/addUser",function (req,res) {
    var user=req.query.user;
    var pass=md5(req.query.pass);
    mysql.query(`insert into admin (user,pass) values ('${user}','${pass}')`,function (err,result) {
        if(err){
            console.log("insert error")
        }else{
            if(result.affectedRows>0){
                res.redirect("/user/add");
            }
        }
    })
})
router.get("/edit/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("select * from admin where id="+id,function (err,result) {
        if(err){
            console.log("err");
        }else{
            res.render("admin/userEdit",{info:result});
        }
    })
})
router.get("/editCon/:id",function (req,res) {
    var id=req.params.id;
    var user=req.query.user;
    var pass=md5(req.query.pass);
    mysql.query(`update admin set user='${user}',pass='${pass}' where id=${id}`,function (err,result) {
        if(err){
            console.log("update error")
        }else{
            if(result.affectedRows>0){
                res.redirect("/user/show");
            }
        }
    })
})
module.exports=router;