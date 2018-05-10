(function() {
    'use-strict';
    // Demo service, it subscibe the search event and, when the event is fired, it gets data form jsfddle echo service and
    // fills the "shared databag"  MetroExaDataService
    angular.module('demo').factory('PodInfoService', ['$http', 'NotifyingService', 'MetroExaDataService', 'ThreadService',
        function($http, NotifyingService, MetroExaDataService, ThreadService) {
            var DATE_FORMAT = 'DD/MM/YYYY';

            var self = this;


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
                    url: window.location.origin + '/exabeat-web-api/api/private/measuremanage/management/consaop/poddetail/DD01',
                    headers: {
                        'REMOTE_USER': 'AE00000'
                    }
                };
                // show usage of thread service
                ThreadService.sendRequestAndProcessResponse(cfg, self).then(function(result) {
                    MetroExaDataService.addPodInfoData({
                        pod: result.data[0].pod,
                        data: result.data
                    });
                });
            }

            console.log('PodInfoService: subscribing', NotifyingService.SEARCH_EVENT);

            NotifyingService.subscribe(NotifyingService.SEARCH_EVENT, handleSearchEvent);

            self.postProcessInfoData = function(data) {
                console.log('here ', data, 'could be processed');
                return data;
            };
            // this code runs in a separate thread where app angular is not available                         
            self.sendHttpRequestAndProcessResponse = function(config) {
                // with 'this' the service's methods are available, 
                // but angular dependencies are unavailables
                console.log(this);
                var workerResponse = vkhttp(config);
                console.log('got infos ');
                return this.postProcessInfoData(JSON.parse(workerResponse.data));
            };
            self.getPodList = function() {
                return MetroExaDataService.getPodList();
            };
            self.getPodData = function(pod) {
                return MetroExaDataService.getPodInfoData(pod);
            };
            self.removePod = function(pod) {
                MetroExaDataService.removePod(pod);
            };


            return self;
        }
    ]);
})();