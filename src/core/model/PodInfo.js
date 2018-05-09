(function() {
    'use-strict';
    // A structured object holding POD data
    angular.module('demo').factory('PodInfo', [function() {

        function PodInfo(pod, data) {
            this.pod = pod;
            this.infos = data;
        }

        PodInfo.build = function(data) {
            return new PodInfo(
                data.pod,
                data
            );
        };
        return PodInfo;
    }]);
})();