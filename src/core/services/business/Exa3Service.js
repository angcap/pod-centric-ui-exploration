(function() {
    'use-strict';
    /*******
    Demo EXA3 Service, it subscribes the search event and, when it's fired, 
    fill the proper context (i.e. relative to MCM tab) informations about a pod
    ******/
    angular.module('demo').factory('Exa3Service', ['NotifyingService', 'MetroExaDataService', 'PodContextsService',
        function(NotifyingService, MetroExaDataService, PodContextsService) {

            console.log('Exa3Service: subscribing', NotifyingService.SEARCH_EVENT);

            NotifyingService.subscribe(NotifyingService.SEARCH_EVENT, function(event, args) {

                console.log('fetching detail for pod: ', args.pod);

                if (args.contexts.indexOf(PodContextsService.EXA003) === -1) {
                    console.log(PodContextsService.EXA003, 'not requested');
                    return;
                }

                MetroExaDataService.addContextData(PodContextsService.EXA003, args.pod, {
                    pod: args.pod,
                    data: {
                        measures: [{
                            pod: args.pod,
                            cutomer: 'Angelo Capone',
                            dtr: 'Caserta'
                        }]
                    }
                });
            });
            return {
                getMeasureList: function(pod) {
                    return MetroExaDataService.getPodContextData(pod)[PodContextsService.EXA003];
                }
            };
        }
    ]);
})();