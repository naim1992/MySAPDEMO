sap.ui.controller("applications.UpdateTeam", {

	updateTeam : function() {
		
		var idTeam4 = this.getView().byId("id_team").getValue();
		var nameTeam = this.getView().byId("name_team").getValue();
		if ((idTeam4 == "") || (nameTeam == "")) {
			alert("One field is empty");
		} else {
			this.getView().byId("name_team").setValue("");

			this.updateTeams(idTeam4, nameTeam);
			alert("Name team updated");
		}

	},

	updateTeams : function(id_team, name_team) {
		var that = this.getView();

		$.ajax({

			url : "/DanoneProject/Update_team",
			type : 'GET',

			data : {
				'id_team' : id_team,
				'name_team' : name_team

			},
			success : function() {
				
				setTimeout(function()
				{
					
					this.handlebackPage();
				 			  
				}, 1);
			},

			error : function(data) {
				console.log("Error : " + data.responseText);
			},
			async : true
		});

	},

	
	getTeamEmployees : function(id_team) {
		var that =  sap.ui.getCore().byId("UpdateId");  

		$.ajax({
			dataType : 'json',
			url : "/DanoneProject/GetTeamEmployees",
			type : 'GET',
			contentType : "application/json",
			data : {
				'id_team' : id_team
			},
			success : function(data) {

				var resultModel = new sap.ui.model.json.JSONModel();
				
				resultModel.setData({modelData : data.employee});

				that.byId("table").setModel(resultModel);
				that.byId("bname").bindProperty("text", "name");
				that.byId("manager").bindProperty("text", "manager");
				that.byId("idTeam2").bindProperty("text", "id_team");

				setTimeout(function()
						{
							
					that.byId("table").bindRows("/modelData");
					that.byId("table").rerender();
						 			  
						}, 1);
				

			},
			error : function(data) {
				console.log("Error : " + data.responseText);
			},
			async : true
		});

	},
	
	updateEmployee : function()
	{
		

		var table = this.getView().byId("table");	
		var selectedIndex =  table.getSelectedIndex();
		var model = table.getModel();
		var data = model.getData();
		var values = data.modelData;
		var rowValue = values[selectedIndex]; 
	 
	
	 	if(rowValue != undefined )
	 		{
	 		var update_employee = sap.ui.getCore().byId("UpdateEmployeeId");
	 		update_employee.byId("bname").setValue(rowValue.name);
	 	    update_employee.byId("bname").setEditable(false);
	 	    //update_employee.byId("manager").setValue( rowValue.manager);
	 	    //update_employee.byId("id_team").setValue( rowValue.id_team);
	 	   
	 	    sap.ui.getCore().byId("myApp").to("UpdateEmployeeId");
	 			
	 		}
	 	
	 	
		
	},
	
	deleteEmployees : function()
	{
		
		var table = this.getView().byId("table");	
		var selectedIndex =  table.getSelectedIndex();
		var model = table.getModel();
		var data = model.getData();
		var values = data.modelData;
		var rowValue = values[selectedIndex]; 
	 
	
	 	if(rowValue != undefined )
	 		{

		    this.delete_employee(rowValue.name, rowValue.id_team);
	 		}
	 	
	 	
		
	},
	
	
	
	
	delete_employee : function(bname, id_team)
	{
		var that = this.getView();
		
		
		$.ajax({
			
			url : "/DanoneProject/DeleteEmployee" ,
			type : 'GET',
			
			data : {
				 'bname' : bname,
				 
				 
				
			},
			success :			function() {
				
				
			 
				
				setTimeout(function()
						{
							
					that.getController().getTeamEmployees(id_team);
						 			  
						}, 1);
					
									},
											
			
			error : 
									function(data) {
										console.log("Error : " + data.responseText);
									},
			async : true
			}); 



		
	},
	
	handlebackPage : function()
	{
		sap.ui.getCore().byId("myApp").back();	
	},
	

});