(function() {
    'use-strict';
    // EXA Tabs controller
    angular.module('demo').controller('SubTabsCtrl', ['$scope','MetroExaDataService', function($scope, MetroExaDataService) {


        $scope.tabproxy = MetroExaDataService;
        $scope.dataproxy = MetroExaDataService;

    }]);
})();