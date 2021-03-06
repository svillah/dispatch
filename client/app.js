(function(){
  var app = angular.module('tool', []);
  app.run(function($http){

  })
  app.controller("PanelController", function(){
    this.tab = 1;
    this.selectTab = function(setTab) {
      this.tab = setTab;
    };
    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  });

  app.controller("ToolController", function($scope, $http){
    $scope.documents = reports;
    var updateTable = $http.get('/employee/reports');
    var dataPromise = updateTable.then(function(res){
        return res.data;
      });
    dataPromise.then(function(res) {
      $scope.documents.dispatcherReports = res;
    });
  });

  app.controller("CreateReportController", function($scope, $http){
    this.dispatcherReport = {};
    this.flash = [];
    this.addReport = function(document){
      this.dispatcherReport.createdOn = Date.now();

      console.log(this.dispatcherReport);
      var report = $http.post('/reports',this.dispatcherReport);
      report.then(function(res){
        console.log(res);
        var dataPromise = $http.get('/employee/reports');
        dataPromise.then(function(res){
          $scope.documents.dispatcherReports = res.data;
        });
      },function(err){
        console.log(err);
      });
      //empties report
      this.dispatcherReport = {};
    };
  });
  
  app.controller("UpdateReportController", function($scope, $http){
    console.log("are you there");
    this.dispatcherReport = {};
    console.log(this.dispatcherReport);
    this.flash = [];
    this.UpdateReport = function(document){

      console.log(this.dispatcherReport);
      var report = $http.put('/reports',this.dispatcherReport);
      report.then(function(res){
        console.log(res);
        var dataPromise = $http.get('/employee/reports');
        dataPromise.then(function(res){
          $scope.documents.dispatcherReports = res.data;
        });
      },function(err){
        console.log(err);
      });
      //empties report
      this.dispatcherReport = {};
    };
    console.log(this.UpdateReport);


  });

  var reports = [
    {
      dispatcherReports: [
        {
          reportID: "000001",
          employeeID: "20582656",
          responderID:"108KL938",
          issueOverview: "Flight 205 Boeing burst into flames",
          software: "Python",
          submissionNotes: "Data not uploading to Python. Attemping to do data visualizations of flight patterns",
          status: "In Progress",
          priority: "High",
          responderNotes: "",
          createdOn: 1397490980837,
          dateOpened: 1397490980890
        },
        {
          reportID: "000002",
          employeeID: "90582656",
          responderID: "17SO2R89",
          issueOverview: "Computer internally combusted",
          software: "Java",
          submissionNotes: "One infinite loop",
          status: "Unresolved",
          priority: "Low",
          responderNotes: "",
          createdOn: 13974909809011,
          dateOpened: 1397490980890
        }
      ]
    }
  ]
})();
