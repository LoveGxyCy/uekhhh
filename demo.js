var crypto=require("crypto");
function md5(str) {
    var md5=crypto.createHash("md5");
    md5.update(str);
    return md5.digest("hex");
}
// console.log(md5("123456"));

var buffer=Buffer.alloc(70000);
function save(str) {
    var md5str=md5(str);
    for(var i=0;i<32;i+=4){
        var index=parseInt(md5str.substr(i,4),16);
        buffer[index]=1;
    }
}

function diff(str) {
    var flag=true;
    var md5str=md5(str);
    for(var i=0;i<32;i+=4){
        var index=parseInt(md5str.substr(i,4),16);
        if(buffer[index]!=1){
            flag=false;
            break;
        }
    }
    if(flag){
        console.log("相同");
    }else{
        console.log("不相同");
    }
}
save("http://baidu.com");
save("http://baidu1.com");
save("http://baidu2.com");
save("http://baidu3.com");
save("http://baidu4.com");

diff("http://baidu4.com");