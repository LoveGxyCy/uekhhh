angular.module("route", ["ngRoute"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "/tpl/entry.html",
            controller: "entry"
        }).when("/index", {
            templateUrl: "/tpl/index.html",
            controller: "index",
        }).when("/login", {
            templateUrl: "/tpl/login.html",
            controller: "login",
        }).when("/welcome", {
            templateUrl: "/tpl/welcome.html",
            controller: "welcome"
        }).when("/show/:id", {
            templateUrl: "/tpl/show.html",
            controller: "show"
        }).when("/member", {
            templateUrl: "/tpl/member.html",
            controller: "member"
        }).when("/member/:mid", {
            templateUrl: "/tpl/memberInfo.html",
            controller: "memberInfo"
        }).when("/todo", {
            templateUrl: "/tpl/todo.html",
            controller: "todo"
        }).when("/todo/add", {
            templateUrl: "/tpl/todoAdd.html",
            controller: "todoAdd"
        }).when("/todo/edit/:cid", {
            templateUrl: "/tpl/todoEdit.html",
            controller: "todoEdit"
        }).when("/log",{
            templateUrl:"/tpl/log.html",
            controller:"log"
        }).when("/log/logWrite",{
            templateUrl:"/tpl/logWrite.html",
            controller:"logWrite"
        }).when("/log/logShow",{
            templateUrl:"/tpl/logShow.html",
            controller:"logShow"
        }).when("/log/sendList",{
            templateUrl:"/tpl/sendList.html",
            controller:"sendList"
        }).when("/log/sendList/:id",{
            templateUrl:"/tpl/sendShow.html",
            controller:"sendShow"
        }).when("/setting",{
            templateUrl:"/tpl/setting.html",
            controller:"setting"
        }).when("/setting/editPass",{
            templateUrl:"/tpl/editPass.html",
            controller:"editPass"
        })
    }])