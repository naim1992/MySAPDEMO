sap.ui.controller("applications.AdminView", {


	
	getTeam : function()
	{
		var that =  sap.ui.getCore().byId("AdminId");
		
		$.ajax({
			
			dataType : 'json',
			url : "/DanoneProject/GetTeamServlet" ,
			type : 'GET',
			contentType: "application/json",
			
			success :			function(data) {
				
									
								var resultModel = new sap.ui.model.json.JSONModel();
									resultModel.setData({
									modelData : data.team 
										
									});
									
									
									that.byId("table").setModel(resultModel);
									that.byId("idTeam").bindProperty("text", "id_team");
									that.byId("nameTeam").bindProperty("text", "name_team");
	
									
									
									setTimeout(function(){
										
										that.byId("table").bindRows("/modelData");
										that.byId("table").rerender();
										
										
									 			   
									}, 1);
									
									sap.ui.getCore().byId("myApp").to("AdminId");
									
					
			},
			error : 
									function(data) {
										alert("Error : " + data.responseText);
									},
			async : true
			}); 
		
	

	},
	

hanldeAskRequest: function()
{
	sap.ui.getCore().byId("myApp").to("CalendarId");
	
},
handlebackPage: function()
{
	sap.ui.getCore().byId("myApp").back();	
	
},

addTeam: function()
{
	var idTeam4 = this.getView().byId("idTeam2").getValue();
    var nameTeam = this.getView().byId("nameTeam2").getValue();
    var idTeam6 = this.getView().byId("idTeam2");					
    var nameTeam2 = this.getView().byId("nameTeam2");				
    
    if((idTeam4 == "")||(nameTeam == "")){
    	alert("One field is empty");
    }
    else{

    										
    	this.addTeams(idTeam4, nameTeam);
    	idTeam6.setValue("");										
    	nameTeam2.setValue("");	
    	this.getTeam();	
    }
 }
    ,
    
    
deleteTeam : function()
    {
	var table = this.getView().byId("table");	
	var selectedIndex =  table.getSelectedIndex();
	var model = table.getModel();
	var data = model.getData();
	var values = data.modelData;
	var rowValue = values[selectedIndex]; 
 
 
 	if(rowValue != undefined )
 		{

	    this.delete_Teams(rowValue.id_team);
 		}
 	
 	this.getTeam();
    },
    


    addEmployee : function()
    {
	var bnameEmployee = this.getView().byId("bname").getValue();
    var managerEmployee = this.getView().byId("manager").getValue();
	var idTeam5 = this.getView().byId("idTeam3").getValue();

	 if((bnameEmployee == "")||(managerEmployee == "")||(idTeam5 == "")){
	    	alert("One field is empty");
	    }
	 else{
		 this.addEmployees(bnameEmployee, managerEmployee, idTeam5);
	 }
    },

updateTeam: function()
{
	
	var table = this.getView().byId("table");	
	var selectedIndex =  table.getSelectedIndex();
 
	var model = table.getModel();
	var data = model.getData();
 
	var values = data.modelData;
	var rowValue = values[selectedIndex]; 
 
 
 	if(rowValue != undefined )
 		{
		var update = sap.ui.getCore().byId("UpdateId");
	    update.byId("id_team").setValue(rowValue.id_team);
	    update.byId("id_team").setEditable(false);
	    update.byId("name_team").setValue( rowValue.name_team);

	    update.getController().getTeamEmployees(rowValue.id_team);
 		}
 	sap.ui.getCore().byId("myApp").to("UpdateId");
},

showRequest: function()
{
    sap.ui.getCore().byId("myApp").to("ShowRequestId");
},



addEmployees: function(bname, manager, team)
{
var that = this.getView();

$.ajax({
	
	url : "/DanoneProject/Add_Employees" ,
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
			sap.ui.getCore().byId("myApp").to("UpdateId");
			
		 			   
		}, 1);
	},
	error : 			function(data) {
								console.log("Error : " + data.responseText);
										},
	async : true
	}); 




},


addTeams: function(id_team, name_team)
{
var that = this.getView();

$.ajax({
	
	url : "/DanoneProject/Add_Team" ,
	type : 'GET',
	
	data : {
		 'id_team' : id_team,
		 'name_team' : name_team
		 
		
	},
	success :			function() { 
		
			setTimeout(function(){
			
			that.getController().getTeam();
			
		 			   
		}, 1);
		
	},
									
	
	error : 
							function(data) {
								console.log("Error : " + data.responseText);
							},
	async : true
	}); 




},

delete_Teams : function(id_team)
{
	var that = this.getView();

	$.ajax({
		
		url : "/DanoneProject/DeleteTeam" ,
		type : 'GET',
		
		data : {
			 'id_team' : id_team,
			 
			 
			
		},
		success :			function() {
			
					setTimeout(function(){
					
						that.getController().getTeam();
					
				 			   
						}, 1);
				
								},
										
		
		error : 
								function(data) {
									console.log("Error : " + data.responseText);
								},
		async : true
		}); 




}

});