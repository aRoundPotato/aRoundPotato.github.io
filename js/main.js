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
    .when("/post", {templateUrl: "partials/post_edit.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
    .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
    // Blog
    .when("/jobs", {templateUrl: "partials/posting_list.html", controller: "BlogCtrl"})
    .when("/jobs/item", {templateUrl: "partials/post_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
  }]);


/**
 * Controls the Blog
 */
 app.controller('BlogCtrl', function ( $scope, $location, $http ) {
  console.log("Blog Controller reporting for duty.");

  var descriptions = `This is a very basic starter template for a blog homepage. It makes use of Font Awesome 
  icons that areThis is a very basic starter template for a blog homepage. 
  It makes use of Font Awesome icons that areThis is a very basic starter template 
  for a blog homepage. It makes use of Font Awesome icons that are
    `;

  $scope.friends = [
  {name:'John', description: descriptions, date: "May 24, 2016", epochTime: 1464062400},
  {name:'Jessie', description: descriptions, date: "May 25, 2016", epochTime: 1464148800},
  {name:'Johanna', description: descriptions, date: "May 26, 2016", epochTime: 1464235200},
  {name:'Joy', description: descriptions, date: "May 27, 2016", epochTime: 1464321600},
  {name:'Mary', description: descriptions, date: "May 23, 2016", epochTime: 1463976000},
  {name:'Peter',description: descriptions, date: "May 29, 2016", epochTime: 1464494400},
  {name:'Sebastian',description: descriptions, date: "May 22, 2016", epochTime: 1463889600},
  ];
});

/**
 * Controls all other Pages
 */
 app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});

 app.controller('HeaderCtrl', ['$scope', 'LoginService', function ($scope, loginService) {

  $scope.loginState = loginService.getLoginState();



}])
 app.controller('ContentCtrl', ['$scope', '$location','LoginService', function ($scope, $location, loginService) {

  $scope.userList = loginService.getAccounts();
  $scope.click = function () {
    loginService.toggleIsLoggedIn();
  };
  $scope.register = function() {
    var account = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      password: this.user.password,
      email: this.user.email
    };
    $scope.userList.push(account);
    loginService.addAccounts(userList);
    loginService.toggleIsLoggedIn();
    $location.path('/login');

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
        loginService.toggleIsLoggedIn();
        $location.path('/');
      }
    }
    if(!isCorrect){
      alert();
    }



  };

}])

 app.factory('LoginService', function () {

  var loginState =
  {
    isLoggedIn: false
  };
  var account1 = {
      firstName: "John",
      lastName: "Doe",
      username: "John",
      password: "password",
      email: "email@email.com"
  };
  var accounts = [];
  accounts.push(account1);

  return {
    getLoginState: function () {
      return loginState;
    },
    toggleIsLoggedIn: function () {
      loginState.isLoggedIn = !loginState.isLoggedIn;
    },
    getAccounts: function () {
      return accounts;
    },
    addAccounts: function (account) {
      accounts = account
    }
  }
});

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});