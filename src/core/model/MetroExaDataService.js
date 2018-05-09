(function() {
    'use-strict';
    // The service holding the data of searched pod,
    //  the structure is something like the following:
    /*
    {
      "IT001E12313": {
        "EXA003": {
          "pod": "IT001E12313",
          "data": {
            ...
          }
        },
        "EXAMCM": {
          "pod": "IT001E12313",
          "data": {
            ...
          }
        }
      },
      "IT001E12314": {
        "EXA003": {
          "pod": "IT001E12314",
          "data": {
            ...
          }
        },
        "EXAMCM": {
          "pod": "IT001E12314",
          "data": {
            ...
          }
        }
      }
    }
    */
    angular.module('demo').factory('MetroExaDataService', ['PodInfoList', function(PodInfoList) {
        var databag = {};
        var activeContexts = [];

        // scan databag and compute active contextes
        function computeActiveContexts() {
            var ctxs = [];
            for (var p in databag) {
                ctxs = ctxs.concat(Object.keys(databag[p]));
            }
            activeContexts = ctxs.reduce(function(a, b) {
                if (a.indexOf(b) === -1) {
                    a.push(b);
                }
                return a;
            }, []);
        }
        return {
            reset: function() {
                for (var prop in databag) {
                    delete databag[prop];
                    databag = {};
                }
                activeContexts = [];
            },
            addPodInfoData: function(podinfodata) {

                PodInfoList.add(podinfodata);
            },
            getPodInfoData: function(pod) {
                return PodInfoList.getPodInfo(pod);
            },
            getPodList: function() {
                return PodInfoList.getPodList();
            },
            addContextData: function(context, pod, data) {
                console.log('MetroExaDataService: add pod ', pod, 'context data for context', context);
                if (databag[pod] === undefined) {
                    databag[pod] = {};
                }
                databag[pod][context] = data;
                computeActiveContexts();
            },
            getPodContextData: function(pod, context) {
                console.log('MetroExaDataService: get pod ', pod, 'context data for context', context);
                return (databag[pod]||[])[context];
            },
            getActiveContexts: function() {
                return activeContexts;
            },
            removePod: function(pod) {
                PodInfoList.removePod(pod);
                delete databag[pod];
            }
        };
    }]);
})();