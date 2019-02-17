sap.ui.controller("applications.ShowRequest", {
	
	getRequestManager : function()
	{
		var that = sap.ui.getCore().byId("ShowRequestId");
		var user_name  = this.getView().byId("headerId").getUserName();
		var user = user_name.replace(["\n"], "")
		$.ajax({
			
			dataType : 'json',
			url : "/DanoneProject/GetRequestManager" ,
			type : 'GET',
			contentType: "application/json",
			data : 
				{
				'manager' : user,

				},
			success :			function(data) {
				
									
								var resultModel = new sap.ui.model.json.JSONModel();
									resultModel.setData({
									modelData : data.request 
										
									});
									
									
									that.byId("table2").setModel(resultModel);
									that.byId("bname2").bindProperty("text", "bname");
									that.byId("dateFrom2").bindProperty("text", "begin_date");
									that.byId("dateTo2").bindProperty("text", "end_date");
				//					that.byId("status2").bindProperty("text", "status_request");
									that.byId("observation").bindProperty("value", "observation");
									
									
									
									that.byId("table2").bindRows("/modelData");
									that.byId("table2").rerender();
					
			},
			error : 
									function(data) {
				
										that.byId("table2").setVisible(false);
										that.byId("managerPanel").setVisible(false);
										console.log("Error : " + data.responseText);
						
									},
			async : true
			}); 
		
	 
		
		 
	},
	  
	
	getHoliday : function()
	{
		var that = sap.ui.getCore().byId("ShowRequestId");
		var user_name  = this.getView().byId("headerId").getUserName();
		var user = user_name.replace(["\n"], "")
		$.ajax({
			
			dataType : 'json',
			url : "/DanoneProject/GetRequests" ,
			type : 'GET',
			contentType: "application/json",
			data : 
				{
				'bname' : user,

				},
			success :			function(data) {
				
									

 					
	var resultModel = new sap.ui.model.json.JSONModel();
	resultModel.setData({
	modelData : data.request 
		
	});
	
	
	that.byId("table").setModel(resultModel);
	that.byId("bname").bindProperty("text", "bname");
	that.byId("dateFrom").bindProperty("text", "begin_date");
	that.byId("dateTo").bindProperty("text", "end_date");
	that.byId("status").bindProperty("text", "status_request");
	that.byId("reason").bindProperty("text", "raison_request");
	
	
	setTimeout(function(){
		
	that.byId("table").bindRows("/modelData");
	that.byId("table").rerender();
 					
 			    }, 1);
	
			},
			error : 
									function(data) {
										console.log("Error : " + data.responseText);
									},
			async : true
			}); 
		
	

	},

	
	handlebackPage: function()
	{
		var consult =  sap.ui.getCore().byId("ConsultId");
		var date = new Date();	
		var day = date.getDate();
		consult.byId("datePicker").setValue(date.toDateString());
		consult.getController().calculWeek(date);
		consult.getController().getEmployees(consult.getController().calcul_date(consult.byId("today1").getText()), consult.getController().calcul_date(consult.byId("today29").getText()));
		sap.ui.getCore().byId("myApp").to("ConsultId");	
		
		
	},
	
	AccepteRequest : function()
	{
		
	 	this.Response_Holiday('VALIDATED');
	 	
	},
	
	refuseRequest : function()
	{
		this.Response_Holiday('REJECTED');
	},
	
	deleteRequest : function()
	{
	
		this.deleteRequests();
	},
	
	deleteRequests : function()
	{
		var that = this.getView();
		var table = that.byId("table");	
		var selectedIndex =  table.getSelectedIndex();
		var model = table.getModel();
		var data = model.getData();
		var values = data.modelData;
		var rowValue = values[selectedIndex]; 
		
	  
	 
	 	if(rowValue != undefined )
	 		{

	 		
	 		
	 		$.ajax({
	 			
	 			url : "/DanoneProject/DeleteHoliday" ,
	 			type : 'GET',
	 			
	 			data : {
	 				 'bname' : rowValue.bname,
	 				 'begin_date' : rowValue.begin_date,
	 				 'end_date' : rowValue.end_date,

	 			},
	 			success :			function() { 	
	 				
	 				setTimeout(function(){
	 					
	 					that.getController().getHoliday();
	 					
	 			    }, 3);
	 				
	 			},
	 											
	 			
	 			error : 
	 									function(data) {
	 										console.log("Error : " + data.responseText);
	 									},
	 			async : true
	 			}); 


	 		}

		
	},
	
	Response_Holiday: function(status)
	{
		
	var that = sap.ui.getCore().byId("ShowRequestId");
	var table = that.byId("table2");	
	var selectedIndex =  table.getSelectedIndex();
	var model = table.getModel();
	var data = model.getData();
	var values = data.modelData;
	var rowValue = values[selectedIndex]; 
	
  
 
 	if(rowValue != undefined )
 		{

 		
 		
 		$.ajax({
 			
 			url : "/DanoneProject/UpdateHoliday" ,
 			type : 'GET',
 			
 			data : {
 				 'bname' : rowValue.bname,
 				 'begin_date' : rowValue.begin_date,
 				 'end_date' : rowValue.end_date,
 				 'status_request' : status,
 				 'observation' : rowValue.observation,
 				 
 				
 			},
 			success :			function() { 	
 				
 				setTimeout(function(){
 					
 					that.getController().getRequestManager();
 					
 			    }, 3);
 				
 				
 			},
 											
 			
 			error : 
 									function(data) {
 										console.log("Error : " + data.responseText);
 									},
 			async : true
 			}); 


 		}
	
	
	


	},

	
	
	
});