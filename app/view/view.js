'use strict';

angular.module('myApp.view', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view', {
      templateUrl: 'view/view.html',
      controller: 'ViewCtrl'
    });
  }])

  .controller('ViewCtrl', ['$scope', '$sce', 'appService', function ($scope, $sce, appService) {
    $scope.songList = [{
        name: "Marvel Studios' Avengers: Endgame",
        id: 'X7G1soqzaRA'
      },
      {
        name: "Marvel Studios' Captain Marvel",
        id: "to6Wl78WMcs"
      },
      {
        name: "Doctor Strange (2016)",
        id: "U_u8MzNZ7TA"
      },
      {
        name: "Captain America: The Winter Soldier",
        id: "vdkx5sUmZcw"
      },
      {
        name: "Captain America: Civil War",
        id: "SqLNDxbh1sM"
      },
      {
        name: "Thor: The Dark World",
        id: "zjioBdjEltw"
      },
      {
        name: "Deadpool 2",
        id: "OQzoD8zWI2E"
      },
      {
        name: "Iron Man",
        id: "bveqypuFak4"
      }
    ];
    $scope.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.songList[0].id);

    $scope.addURL = function () {
      if (_checkURLvalidity()) {
        var id = $scope.url.split('watch?v=')[1];
        appService.getVideoTitle(id, 'AIzaSyBiCFQiccHhhvXxbok0jgUhG5ZOWGvb-f0').then(function (response) {
          $scope.songList.push({
            name: response.data.items[0].snippet.title,
            id: id
          });
          $scope.url = '';
        });
      } else {
        alert('Invalid URL');
        $scope.url = '';
      }
    };

    $scope.playSong = function (index) {
      $scope.video = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.songList[index].id);
    };

    $scope.deleteURL = function (index) {
      $scope.songList.splice(index, 1);
    };

    function _checkURLvalidity(url) {
      return $scope.url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/);
    }

  }])

  .service('appService', ['$http', function ($http) {
    return {
      getVideoTitle: function (id, key) {
        return $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&fields=items(snippet)&key=' + key);
      }
    };
  }]);