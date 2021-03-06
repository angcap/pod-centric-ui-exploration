(function() {
    'use-strict';
    angular.module('demo').factory('ThreadService', ['vkThread', function(vkThread) {
        var self = this;
        var thread = vkThread();

        self.getThread = function() {
            return thread;
        };
        self.sendHttpRequest = function(config) {
            return vkhttp(config);
        };
        self.sendRequest = function(_config) {
            var param = {
                fn: self.sendHttpRequest,
                args: [_config]
            };
            return thread.exec(param);
        };
        self.sendRequestAndProcessResponse = function(requestConfig,processService){
            var param = {
                fn: processService.sendHttpRequestAndProcessResponse,
                args: [requestConfig],
                context: processService
            };
            return thread.exec(param);            
        };
        return self;
    }]);
})();