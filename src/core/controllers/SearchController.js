(function() {
    'use-strict';
    // First Level Controller
    angular.module('demo').controller('SearchCtrl' ,['$scope','NotifyingService', 'PodContextsService', 'MetroExaDataService',
        function($scope, NotifyingService, PodContextsService, MetroExaDataService) {

            // tabs
            $scope.tabs = PodContextsService.getAvailableContexts();

            // Selected tabs
            $scope.tabselection = [];

            // Toggle selection for a given tab by name
            $scope.toggleSelection = function toggleSelection(tabname) {
                var idx = $scope.tabselection.indexOf(tabname);
                if (idx > -1) {
                    $scope.tabselection.splice(idx, 1);
                } else {
                    $scope.tabselection.push(tabname);
                }
            };

            // function attached to search button, emits an event for POD and activated contexts (application Tabs)
            $scope.notify = function() {
                
                console.log('emitting', NotifyingService.SEARCH_EVENT);

                NotifyingService.notify(NotifyingService.SEARCH_EVENT, {
                    pod: $scope.pod,
                    contexts: $scope.tabselection
                });

            };
        }
    ]);
})();