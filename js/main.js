/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
 'use strict';
 var app = angular.module('tutorialWebApp', [
  'ngRoute','ngCookies']);

/**
 * Configure the Routes
 */
 app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "partials/faq.html", controller: "PageCtrl"})
    .when("/post", {templateUrl: "partials/post_edit.html", controller: "BlogCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
    .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
    // Blog
    .when("/jobs", {templateUrl: "partials/posting_list.html", controller: "BlogCtrl"})
    .when("/jobs/item", {templateUrl: "partials/post_item.html", controller: "BlogCtrl"})
    .when("/jobs/edit/item", {templateUrl: "partials/edit_post_item.html", controller: "BlogCtrl"})
    .when("/my_profile", {templateUrl: "partials/profile.html", controller: "BlogCtrl"})
    .when("/my_posts", {templateUrl: "partials/my_posts.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }]);


 app.controller('BlogCtrl', ['$scope','$location','$http','LoginService',function ( $scope, $location, $http, loginService ) {
  console.log("Blog Controller reporting for duty.");

  $scope.posts = loginService.getPosts();
  $scope.loggedInAccount = loginService.getLoggedInAccount();
  $scope.postItem = loginService.getThisPost();
  $scope.postDisabled = loginService.getViewing();

  var currentLocation = $location.path();
  $scope.$on('$locationChangeStart', function(event) {
    if(currentLocation == "/post" && true){

      var r = confirm("Are you sure you want to leave this page");
      if (r == true) {
      }
      else {
        event.preventDefault();
      }

    }
  });
  $scope.something = function(){
    var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        var timestamp = Math.floor(Date.now() / 1000);
        var newdate = monthNames[month] + " " + day + ", " + year;

        var tempPost = {
          name: $scope.loggedInAccount.name , description: this.description, date: newdate, epochTime: timestamp, title: this.title, category: this.category ,estimatedTime:this.estimatedTime ,email:this.email, phone:this.phone
        }
        toastr["success"]("Created New Post");
        $scope.posts.push(tempPost);
        loginService.setPosts($scope.posts);

        this.description ="";
        this.title="";
        this.category="";
        this.estimatedTime="";
        this.email="";
        this.phone="";
        this.pay="";
      }
      $scope.submitPost = function(){
        toastr["sucess"]("Completed!");
        if($scope.loggedInAccount != null || $scope.loggedInAccount != undefined){

          var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        var newdate = monthNames[month] + " " + day + ", " + year;
        var tempPost = {
          name: $scope.loggedInAccount.name ,username: $scope.loggedInAccount.username , description: this.description, date: newdate, epochTime: dateObj.now(), title: this.title, category: this.category ,estimatedTime:this.estimatedTime ,email:this.email, phone:this.phone, currency:this.currency,pay:this.pay
        };
        $scope.posts.push(tempPost);
        loginService.setPosts($scope.posts);
        toastr["sucess"]("Completed!");
      }

    }
    $scope.viewPost = function (post){
      loginService.viewThisPost(post);
      $location.path("/jobs/item")
    }
    $scope.editPost = function (post){
      loginService.editThisPost(post);
      $location.path("/jobs/edit/item")
    }

    window.onbeforeunload = function (e) {    
    if(currentLocation == "/post"){  
      return 'Are You Sure? You will lose this form';
      }
    };

}]);


/**
 * Controls all other Pages
 */
 app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

 app.controller('HeaderCtrl', ['$scope', 'LoginService', function ($scope, loginService) {

  $scope.loginState = loginService.getLoginState();

}])

 app.controller('ContentCtrl', ['$scope', '$location', '$rootScope','LoginService', function ($scope, $location,$rootScope, loginService) {

  $scope.userList = loginService.getAccounts();
  $scope.loginState = loginService.getLoginState();
  $scope.logout = function () {
    toastr["success"]("Logged Out!");
    loginService.setLogout();
  };
  $scope.register = function() {
    var account = {
      name: this.user.name,
      username: this.user.username,
      password: this.user.password,
      retypePassword: this.user.retypePassword,
      email: this.user.email
    };
    $scope.userLength = $scope.userList.length;
    var unique = true;
    for(var i = 0; i < $scope.userLength; i++){
      if(account.username ==  $scope.userList[i].username){
        unique = false;
      }
    }

    if(!unique){
      toastr["error"]("Username Taken!");
    }
    else if(account.password != account.retypePassword){
      toastr["error"]("passwords do not match!");
    }
    else{
      $location.path('/login').replace();
      toastr["success"]("Registered!");
      $scope.userList.push(account);
      loginService.addAccounts($scope.userList);
    }
  };

  $scope.login = function() {
    $scope.userLength = $scope.userList.length;
    var user = {
      username: this.username,
      password: this.password,
    };
    var isCorrect = false;
    for(var i = 0; i < $scope.userLength; i++){
      if(user.username ==  $scope.userList[i].username && user.password == $scope.userList[i].password){
        $location.path('/').replace();
        toastr["success"]("Logged In!");
        isCorrect = true;
        loginService.toggleIsLoggedIn();
        loginService.setLoggedInAccount($scope.userList[i]);

      }
    }
    if(!isCorrect){
      toastr["error"]("Wrong username or password");

    }
  };

}]);

 app.factory('LoginService', function () {

  var descriptions = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  var posts = [
  {name:'John',username:'John', description: descriptions, date: "May 24, 2016", epochTime: 1464062400, title:"Some title", category: "Websites,IT and Software",estimatedTime:"Less than 1 Day",email:"email@email.com", pay:200, currency:"USD"},
  {name:'Jessie', username:'Jessie',description: descriptions, date: "May 25, 2016", epochTime: 1464148800, title:"Some title", category: "Websites,IT and Software", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"USD"},
  {name:'Johanna', username:'Johanna',description: descriptions, date: "May 26, 2016", epochTime: 1464235200, title:"Some title", category: "Websites,IT and Software", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"USD"},
  {name:'Joy', username:'Joy',description: descriptions, date: "May 27, 2016", epochTime: 1464321600, title:"Some title", category: "Websites,IT and Software", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"USD"},
  {name:'Mary',username:'Mary', description: descriptions, date: "May 23, 2016", epochTime: 1463976000, title:"Some title", category: "Websites,IT and Software", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"CAD"},
  {name:'Peter',username:'Peter',description: descriptions, date: "May 29, 2016", epochTime: 1464494400, title:"Some title", category: "Websites,IT and Software", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"USD"},
  {name:'Sebastian', username:'Sebastian',description: descriptions, date: "May 22, 2016", epochTime: 1463889600, title:"Some title", category: "Arts and Crafts", estimatedTime:"Less than 1 week",email:"email@email.com", pay:200, currency:"EURO"},
  ];

  var loginState =
  {
    isLoggedIn: false
  };
  var account1 = {
    name: "John Doe",
    username: "John",
    password: "password",
    email: "email@email.com"
  };
  var accounts = [account1];
  var loggedInAccount;
  var postItem = null;
  var viewing = true;

  return {
    getLoginState: function () {
      return loginState;
    },
    toggleIsLoggedIn: function () {
      loginState.isLoggedIn = !loginState.isLoggedIn;
    },
    setLogout: function () {
      loginState.isLoggedIn = false;
      loggedInAccount = null;
    },
    getAccounts: function () {
      return accounts;
    },
    addAccounts: function (account) {
      accounts = account
    },
    getLoggedInAccount: function() {
      return loggedInAccount;
    },
    setLoggedInAccount: function(account2) {
      loggedInAccount = account2;
    },
    getPosts: function (){
      return posts;
    },
    setPosts: function(post){
      posts = post;
    },
    viewThisPost: function(post){
      postItem = post;
      viewing = true;
    },
    editThisPost: function(post){
      postItem = post;
      viewing = "disabled";
    },
    getThisPost: function(){
      return postItem;
    },
    getViewing: function(){
      return viewing;
    },

  }
});

 $(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
    $(this).collapse('hide');
  }
});

 toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-left",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2500",
  "extendedTimeOut": "300",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
