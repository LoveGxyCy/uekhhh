var express=require('express');
var router=express.Router();
var mysql=require('../common/mysql');
var tree=require("../common/tree");

router.get("/add",function (req,res) {
    tree.getTree("bumen",function (str) {
        res.render("admin/bumen.ejs",{data:str})
    })
})
router.get("/addCon",function (req,res) {
    var pid=req.query.pid;
    var name=req.query.name;
    mysql.query("insert into bumen (pid,name) values (?,?)",[pid,name],function (err,result) {
        if(err){
            console.log("insert err");
        }else{
            if(result.affectedRows>0){
                res.redirect("/bumen/add");
            }
        }
    })
})
router.get("/show",function (req,res) {
    mysql.query("select * from bumen",function (err,result) {
        if(err){
            console.log("select error");
        }else{
            res.render("admin/bumenShow",{info:result});
        }
    })
})
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    mysql.query(`delete from bumen where id=${id}`,function (err,result) {
        if(err){
            console.log("delete err");
        }else{
            if(result.affectedRows>0){
                res.redirect("/bumen/show");
            }
        }
    })
})
module.exports = router;