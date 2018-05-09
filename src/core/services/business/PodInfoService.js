(function() {
    'use-strict';
    // Demo service, it subscibe the search event and, when the event is fired, it gets data form jsfddle echo service and
    // fills the "shared databag"  MetroExaDataService
    angular.module('demo').factory('PodInfoService', ['$http', 'NotifyingService', 'MetroExaDataService', 'ThreadService',
        function($http, NotifyingService, MetroExaDataService, ThreadService) {

            var DATE_FORMAT = 'DD/MM/YYYY';

            
            function handleSearchEvent(event, args) {

                console.log('PodInfoService: fetching detail for pod: ', args.pod);
                var payload = {};
                payload.pointValue = args.pod;
                payload.typePoint = 'pod';
                payload.dateFrom = moment().format(DATE_FORMAT);
                payload.dateTo = '31/12/9999';
                payload.companyCode = 'DD01';
              
                var cfg = {
                    body: payload,
                    method: 'POST',
                    url: window.location.href+'exabeat-web-api/api/private/measuremanage/management/consaop/poddetail/DD01',
                    
                    headers: {
                        'REMOTE_USER': 'AE00000'
                    }
                };
                // show usage of thread service
                ThreadService.sendRequest(cfg).then(function(response) {
                    console.log('got infos for pod: ', args.pod);
                    var result = JSON.parse(response.data);
                    MetroExaDataService.addPodInfoData({
                        pod: args.pod,
                        data: result.data
                    })
                });
            }

            console.log('PodInfoService: subscribing', NotifyingService.SEARCH_EVENT);

            NotifyingService.subscribe(NotifyingService.SEARCH_EVENT, handleSearchEvent);

            return {

                getPodList: function() {
                    return MetroExaDataService.getPodList();
                },
                getPodData: function(pod) {
                    return MetroExaDataService.getPodInfoData(pod);
                },
                removePod: function(pod) {
                    MetroExaDataService.removePod(pod);
                }
            };
        }
    ]);
})();