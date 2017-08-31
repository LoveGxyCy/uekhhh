var express = require("express");
var router = express.Router();
var mysql = require("../common/mysql");
var md5 = require("../common/md5");

router.get("/select", function (req, res) {
    mysql.query("select * from news order by id desc limit 5,20", function (err, result) {
        res.send(JSON.stringify(result));
    })
})

router.get("/select/:id", function (req, res) {
    var id = req.params.id;
    mysql.query("select * from news where id=" + id, function (err, result) {
        res.send(JSON.stringify(result));
    })
})

router.get("/member", function (req, res) {
    var sql = `select bumen.name as bname,member.* from bumen,member where bumen.id=member.bumenid`;
    mysql.query(sql, function (err, result) {
        if (err) {
            console.log("err");
            res.end();
        } else {
            res.send(JSON.stringify(result));
        }
    })
})
router.get("/check", function (req, res) {
    if (req.cookies.indexLogin) {
        res.end("ok");
    } else {
        res.end("err")
    }
})
router.get("/login", function (req, res) {
    var name = req.query.name;
    var pass = req.query.pass;
    var sql = "select * from member";
    mysql.query(sql, function (err, result) {
        if (err) {
            console.log("err");
        } else {
            var flag = true;
            for (var i = 0; i < result.length; i++) {
                if (result[i].numbers == name) {
                    if (result[i].pass = md5(pass)) {
                        flag = false;
                        res.cookie("name", name, {signed: true});
                        res.cookie("id", result[i].id);
                        res.cookie("indexLogin", "yes");
                        var obj = {"message": "ok", name: name, id: result[i].id}
                        res.end(JSON.stringify(obj));
                    }
                }
            }
            if (flag) {
                res.end(JSON.stringify({message: "err"}));
            }
        }
    })
})

router.get("/addLog", function (req, res) {
    var done = req.query.done;
    var undone = req.query.undone;
    var doing = req.query.doing;
    var acctid = req.query.acctid;
    var sendid = req.query.sendid;

    var sql = `insert into logs (done,undone,doing,acctid,sendid) values ('${done}','${undone}','${doing}',${acctid},${sendid})`;
    console.log(sql);
    mysql.query(sql, function (err) {
        if (err) {
            console.log("Err");
        } else {
            res.send('ok');
        }
    })
})

router.get("/editPass", function (req, res) {
    var pass=md5(req.query.pass);
    var newPass=md5(req.query.newPass);
    var mid=req.query.mid;
    mysql.query("select * from member where id="+mid, function (err, result) {
        if(err){
            console.log(err);
        }else {
            if(result.length==0){
                res.send('not select');
            }
            if(!result[0].pass==pass){
                res.send('not select');
            }else {
                mysql.query('update member set pass="'+newPass+'" where id='+mid,function (err,result) {
                    if(err){
                        console.log(err);
                    }else {
                        res.send('ok');
                    }
                })
            }
        }
    })
});

router.get("/sendList",function (req,res) {
    var sendid=req.query.sendid;
    var sql="select * from logs where sendid="+sendid;
    mysql.query(sql,function (err,result) {
        if(err){
            console.log(err);
        }else{
            res.send(JSON.stringify(result));
        }
    })
})
router.get("/logout",function (req,res) {
    res.clearCookie();
    res.send("ok");
})
router.get("/reset",function (req,res) {
    var pass=md5(req.query.pass);
    var pass1=md5(req.query.pass1);
    var pass2=md5(req.query.pass2);
    var id=req.query.id;
    if(pass1!=pass2){
        res.send("err");
        return;
    }
    var sql=`select pass from member where id=${id} and pass='${pass}'`;
    mysql.query(sql,function (err,result) {
        if(err){
            console.log(err);
        }else{
            if(result.length>0){
                var sql=`update member set pass='${pass1}' where id=${id}`;
                mysql.query(sql,function (err,result) {
                    if(err){
                        console.log(err);
                    }else{
                        if(result.affectedRows>0){
                            res.clearCookie();
                            res.send("ok");
                        }
                    }
                })
            }else{
                res.send("err");
            }
        }
    })
})

router.get("/sendajax/:id", function (req, res) {
    var id = req.params.id;
    mysql.query("select * from logs where id=" + id, function (err, result) {
        res.send(JSON.stringify(result));
    })
})
module.exports = router;

