sap.ui.controller("applications.UpdateEmployee", {
	
	
	updateEmployee : function()
	{

		var bnameEmployee = this.getView().byId("bname").getValue();
	    var managerEmployee = this.getView().byId("manager").getValue();
		var idTeam = this.getView().byId("id_team").getValue();

		 if((bnameEmployee == "")||(managerEmployee == "")||(idTeam == "")){
		    	alert("One field is empty");
		    }
		 else{
		
		 this.UpdateEmployees(bnameEmployee, managerEmployee, idTeam);
			
		 }
		
	},
	
	UpdateEmployees: function(bname, manager, team)
	{
		
		var that = this.getView();

		$.ajax({
			
			url : "/DanoneProject/UpdateEmployee" ,
			type : 'GET',
			
			data : {
				 'bname' : bname,
				 'manager' : manager,
				 'team' : team
				
			},
			success :			function() { 
				
				setTimeout(function(){
					
					var team_employees = sap.ui.getCore().byId("UpdateId");
			    	team_employees.getController().getTeamEmployees(team);
					sap.ui.getCore().byId("myApp").back(); 
				 			   
				}, 1);
				
				
			
			},
			error : 			function(data) {
										console.log("Error : " + data.responseText);
												},
			async : true
			}); 


	},
	
	
	
	
	handlebackPage: function()
	{
		sap.ui.getCore().byId("myApp").back();	
		
	},
	
	
	
});