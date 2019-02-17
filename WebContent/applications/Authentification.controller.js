sap.ui.controller("applications.Authentification", {

handleLoginPress: function()
{
	var oAuthen = sap.ui.getCore().byId("authenId");
	var user = oAuthen.byId("inpLogin").getValue();
	var passWord = oAuthen.byId("inpPWD").getValue();
	var oAdmin = 1;
	
	if(user != "" && passWord != "")
		{
	var consult = sap.ui.getCore().byId("ConsultId");
	var calendar = sap.ui.getCore().byId("CalendarId");
	var admin = sap.ui.getCore().byId("AdminId");
	var update = sap.ui.getCore().byId("UpdateId");
	var updateEmployee = sap.ui.getCore().byId("UpdateEmployeeId");
	

	consult.byId("headerId").setUserName(user);
	calendar.byId("headerId").setUserName(user);
	admin.byId("headerId").setUserName(user);
	
	
	
	if(oAdmin==1){
	
		var admin = sap.ui.getCore().byId("AdminId");	
		admin.getController().getTeam();
		
	 sap.ui.getCore().byId("myApp").to("AdminId");
	
	
	
	}
	else{
		
		var consult= sap.ui.getCore().byId("ConsultId");
		var date = new Date();	
		var day = date.getDate();
		consult.byId("datePicker").setValue(date.toDateString());
		consult.getController().calculWeek(date);
		consult.getController().getEmployees();
		
		sap.ui.getCore().byId("myApp").to("ConsultId");
	
	
	
	}
		}
	

}
});