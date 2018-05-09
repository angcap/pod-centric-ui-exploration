(function() {
    'use-strict';
    //POD Tabs controller, it uses a service to get needed data
    angular.module('demo').controller('PodTabCtrl', ['$scope','PodInfoService', function($scope, PodInfoService) {

        $scope.podData = PodInfoService;

        $scope.showTabs = function() {
            console.log('PodTabCtrl showTabs, # of tabs', $scope.podData.getPodList().length);
            return $scope.podData.getPodList().length > 0;
        };

        $scope.tabs = function() {
            console.log('PodTabCtrl tabs', PodInfoService.getPodList());
            return $scope.podData.getPodList();
        };
    }]);
})();