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
    .when("/pricing", {templateUrl: "partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/login", {templateUrl: "partials/login.html", controller: "PageCtrl"})
    .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
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
  app.controller('ContentCtrl', ['$scope', 'LoginService', function ($scope, loginService) {
    
    $scope.click = function () {
      loginService.toggleIsLoggedIn();
    };
    
  }])
  app.factory('LoginService', function () {
    
    var loginState =
      {
        isLoggedIn: false
      };
    
    return {
      getLoginState: function () {
        return loginState;
      },
      toggleIsLoggedIn: function () {
        loginState.isLoggedIn = !loginState.isLoggedIn;
      }
    }
  });

  app.controller('ExampleController', ['$scope', function($scope) {
      $scope.userList = [];
      var account = {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            password: this.user.password,
      };
      $scope.user = account;
      $scope.register = function() {
          $scope.userList.push("asdasd");
          $scope.text = '';
      };
    }]);
