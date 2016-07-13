/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
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
    .when("/my_profile", {templateUrl: "partials/profile.html", controller: "BlogCtrl"})
    .when("/my_posts", {templateUrl: "partials/my_posts.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }]);


 app.controller('BlogCtrl', ['$scope','$location','$http','LoginService',function ( $scope, $location, $http, loginService ) {
  console.log("Blog Controller reporting for duty.");

  $scope.posts = loginService.getPosts();

  var currentLocation = $location.path();
    $scope.$on('$locationChangeStart', function(event) {
      if(currentLocation == "/post"){

        var r = confirm("Are you sure you want to leave this page");
        if (r == true) {
        }
        else {
            event.preventDefault();
        }
       
      }
  });

//   window.onbeforeunload = function (e) {      
//   return 'Are You Sure?';
// };

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
  
  var descriptions = `This is a very basic starter template for a blog homepage. It makes use of Font Awesome 
  icons that areThis is a very basic starter template for a blog homepage. 
  It makes use of Font Awesome icons that areThis is a very basic starter template 
  for a blog homepage. It makes use of Font Awesome icons that are
    `;
  var posts = [
  {name:'John', description: descriptions, date: "May 24, 2016", epochTime: 1464062400, title:"Sometitle", category: "Websites,IT and Software",estimatedTime:"Less than 1 week"},
  {name:'Jessie', description: descriptions, date: "May 25, 2016", epochTime: 1464148800, title:"Sometitle", category: "Websites,IT and Software", estimatedTime:"Less than 1 week"},
  {name:'Johanna', description: descriptions, date: "May 26, 2016", epochTime: 1464235200, title:"Sometitle", category: "Websites,IT and Software", estimatedTime:"Less than 1 week"},
  {name:'Joy', description: descriptions, date: "May 27, 2016", epochTime: 1464321600, title:"Sometitle", category: "Websites,IT and Software", estimatedTime:"Less than 1 week"},
  {name:'Mary', description: descriptions, date: "May 23, 2016", epochTime: 1463976000, title:"Sometitle", category: "Websites,IT and Software", estimatedTime:"Less than 1 week"},
  {name:'Peter',description: descriptions, date: "May 29, 2016", epochTime: 1464494400, title:"Sometitle", category: "Websites,IT and Software", estimatedTime:"Less than 1 week"},
  {name:'Sebastian',description: descriptions, date: "May 22, 2016", epochTime: 1463889600, title:"Sometitle", category: "Arts and Crafts", estimatedTime:"Less than 1 week"},
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

  return {
    getLoginState: function () {
      return loginState;
    },
    toggleIsLoggedIn: function () {
      loginState.isLoggedIn = !loginState.isLoggedIn;
    },
    setLogout: function () {
      loginState.isLoggedIn = false;
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
