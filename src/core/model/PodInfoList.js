(function() {
    'use-strict';
    // A structured object holding the list of pod informations
    angular.module('demo').factory('PodInfoList', ['PodInfo', function(PodInfo) {
        var podinfolist = {};
        return {
            getPodList: function() {
                return Object.keys(podinfolist);
            },

            getPodInfo: function(pod) {
                return podinfolist[pod].infos;
            },

            add: function(data) {
                var podinfo = PodInfo.build(data);
                podinfolist[podinfo.pod] = podinfo;
            },
            removePod: function(pod) {
                delete podinfolist[pod];
            },
            reset: function() {
                for (var pod in podinfolist) {
                    delete podinfolist[pod];
                }
                podinfolist = {};
            }
        };
    }]);
})();