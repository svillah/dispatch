(function(){
  var app = angular.module('tool', []);

  app.controller("PanelController", function(){
    this.tab = 1;
    this.selectTab = function(setTab) {
      this.tab = setTab;
    };
    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  });

  app.controller("ToolController", function(){
    this.documents = reports;
  });

  app.controller("CreateReportController", function($http){
    this.dispatcherReport = {};
    this.flash = [];
    this.addReport = function(document){
      this.dispatcherReport.createdOn = Date.now();
      
      console.log(this.dispatcherReport);
      var report = $http.post('/reports',this.dispatcherReport);
      report.then(function(res){
        console.log(res)
        //flash("Report Created");
      },function(err){
        console.log(err);
      });
      //empties report
      this.dispatcherReport = {};
      //createForm.setUntouched();  unresolved
    };



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
