(function() {
    'use-strict';
    /* 
    The services need to be eagerly activated in order to subscribe the search event, otherwise angular
    will lazy load them based on dependcies and,
    for instance, those ones depending on the second level tab controller will be activated ony when 
    the first level tab became visible!
    Then all services that need to sucbscribe the search event must be enlisted as dependency of SearchEventObserver
    */
    angular.module('demo').factory('SearchEventObserver', [
        'Exa3Service', 
        'McmService', 
        function(Exa3Service, McmService) {
        console.log('SearchEventObserver started');
        return {};
    }]);
})();