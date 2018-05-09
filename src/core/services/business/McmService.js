(function() {
    'use-strict';
    /*******
    Demo MCM Service, it subscribes the search event and, when it's fired, 
    fill the proper context (i.e. relative to MCM tab) informations about a pod
    ******/
    angular.module('demo').factory('McmService', ['NotifyingService', 'MetroExaDataService', 'PodContextsService',
        function(NotifyingService, MetroExaDataService, PodContextsService) {
            console.log('McmService: subscribing', NotifyingService.SEARCH_EVENT);

            NotifyingService.subscribe(NotifyingService.SEARCH_EVENT, function(event, args) {

                console.log('fetching detail for pod: ', args.pod);

                if (args.contexts.indexOf(PodContextsService.EXAMCM) === -1) {
                    console.log(PodContextsService.EXAMCM, 'not requested');
                    return;
                }

                MetroExaDataService.addContextData(PodContextsService.EXAMCM, args.pod, {
                    pod: args.pod,
                    data: {
                        mcm: [{
                            pod: args.pod,
                            type: 'MCM'
                        }]
                    }
                });
            });
            return {
                getMcmData: function(pod) {
                    return MetroExaDataService.getPodContextData(pod)[PodContextsService.EXAMCM];
                }
            }
        }
    ]);
})();