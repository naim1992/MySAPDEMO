sap.ui.controller("applications.Consult", {
	
	
	
	 
	months: function(month)
	{
		var monthNames = [
		                  "January", "February", "March",
		                  "April", "May", "June", "July",
		                  "August", "September", "October",
		                  "November", "December"
		              ];
		return monthNames[month];
	},
	
	
	dayz: function(dayNumber)
	{
		var dayNames = [
		                "Su", "Mo", "Tu", "We",
		                  "Th", "Fr", "Sa"
		              ];
		return dayNames[dayNumber];
	},
	
	getEmployees : function(begin_date, end_date)
	{
		var that =  sap.ui.getCore().byId("ConsultId");
		var user_name  = this.getView().byId("headerId").getUserName();
		var user = user_name.replace(["\n"], "")
		
		$.ajax({
			dataType : 'json',
			url : "/DanoneProject/GetEmployeeServlet" ,
			type : 'GET',
			contentType: "application/json",
			data : 
				{
				    'bname' : user,
					'begin_date' : begin_date,
					'end_date' : end_date,
				},
				
			success :			function(data) {
				
									
								var resultModel = new sap.ui.model.json.JSONModel();
									resultModel.setData({
									modelData : data.employee 
										
									});
									
									
									that.byId("table").setModel(resultModel);
									that.byId("employee").bindProperty("text", "name");
									that.byId("b1t32").bindProperty("text", "nbr_day_worked");
									
									
									
									for(i=1; i<32; i++)
									{
									var date = new Date( that.byId("today"+i).getText());
									date.toISOString();
									
									var day = date.getDate();
									var month = date.getMonth() + 1;
									var year = date.getFullYear();
									
									if(day.toString().length == 1 )
										{
										day = "0" + day.toString();
										}
									 
									if(month.toString().length == 1 )
									{
									month = "0" + month.toString();
									}
									
									
									var date1 = year+"-"+month+"-"+day;
									
									
									
									
									that.byId("b1t"+i).bindProperty("text", date1, function(cellValue) {  
							               
										var cell = '';
										if (cellValue != undefined)
						            	{
										cell = cellValue[0];
										
							              
							                if (cell == 'F') {  
							                	this.addStyleClass('red');  
							                } else
							                 	if(cell == 'H') { 
							             
							                		this.addStyleClass('green');   
							                } 
									 		else
						                	if(cell == 'N') {  
						                
						                		this.addStyleClass('yellow');  
						                	} 
							                
							            	
							            	}
										
										return cell; 
							                
							            });              
									
									
									that.byId("b2t"+i).bindProperty("text", date1, function(cellValue) {  
							                
						                  
										var cell = '';
										if (cellValue != undefined)
						            	{
										cell = cellValue[1];
										
							                if (cell == 'F') {  
							                	
							                	this.addStyleClass('red');  
							                } else
							                 	if(cell == 'H') { 
							              
							                		this.addStyleClass('green');   
							                } 
									 		else
						                	if(cell == 'N') {  
						                
						                		this.addStyleClass('yellow');  
						                	} 
							                 
						            	}
										 return cell;
						            }); 
									
									
									}
									
									
									
									
									
									setTimeout(function(){
					 					
										that.byId("table").bindRows("/modelData");
										that.byId("table").rerender();
					 					
					 			    }, 1);	
									
									
									
									
															
			},
			error : 
									function(data) {
										alert("Error : " + data.responseText);
									
									},
			async : true
			}); 
		
	

	},

	
	
	onAfterRendering: function()
	{
		$.ajax({
			
			url : "/DanoneProject/AuthServlet" ,
			type : 'GET',
			
			success :			function(data) 
			
			{
				
				
				var that = sap.ui.getCore().byId("ConsultId");
				var calendar = sap.ui.getCore().byId("CalendarId");
				var admin = sap.ui.getCore().byId("AdminId");
				var update = sap.ui.getCore().byId("UpdateId");
				var updateEmployee = sap.ui.getCore().byId("UpdateEmployeeId");
				var showRequest = sap.ui.getCore().byId("ShowRequestId");

				
				
				consult.byId("headerId").setUserName(data);
				calendar.byId("headerId").setUserName(data);
				admin.byId("headerId").setUserName(data);
				update.byId("headerId").setUserName(data);
				updateEmployee.byId("headerId").setUserName(data);
				showRequest.byId("headerId").setUserName(data);

				
				
				
				var date = new Date();	
				var day = date.getDate();
				that.byId("datePicker").setValue(date.toDateString());
				
			
 					
					that.getController().calculWeek(date);
					that.getController().getEmployees(that.getController().calcul_date(that.byId("today1").getText()), that.getController().calcul_date(that.byId("today31").getText()));
					
 			   
				
				
				
			},
			error : 
									function(data) {
										console.log("Error : " + data.responseText);
									},
			async : true
			}); 
		

	},
	
	
	calculWeek : function(date)
	{
		var day = date.getDate();
		var month;
		var date2 = new Date();								

		for(i=1; i<32; i++)
		{
		date2.setFullYear(date.getFullYear());				
		date2.setMonth(date.getMonth());					
		date2.setDate(day);									
		
		if(i==1){
		this.getView().byId("column"+ (i)+ "Id").setText(date2.getDate());
		this.getView().byId("day"+i).setText(date.getDay());

		this.getView().byId("today1").setText(date.toDateString());
		}
		else{
		month=date2.getMonth()+1;
		this.getView().byId("column"+ (i)+ "Id").setText(date2.getDate());
		this.getView().byId("day"+i).setText(date2.getDay());
		this.getView().byId("today"+i).setText(date2.toDateString());

		}
		
		var days= this.dayz(date2.getDay());		
		this.getView().byId("day"+i).setText(days);

		day++;
		
		}

	
		date = new Date(this.getView().byId("today1").getText());
		
		if(date.getMonth()==11){
			this.getView().byId("month").setText(this.months(date.getMonth()) + " " + date.getFullYear() + "-" + this.months(0) + " " + (date.getFullYear()+1) );
		}
		else{
			this.getView().byId("month").setText(this.months(date.getMonth()) + " " + date.getFullYear() + "-" + this.months(date.getMonth()+1) + " " + date.getFullYear());
		}
		
	},
	
	calcul_date : function(day)
	{
		var that =  sap.ui.getCore().byId("ConsultId");
		var date = new Date(day);
		date.toISOString();
		
		
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		if(day.toString().length == 1 )
			{
			day = "0" + day.toString();
			}
		
		if(month.toString().length == 1 )
		{
		month = "0" + month.toString();
		}
		
		
		date = year+""+month+""+day;
		return date;
		
	},
	
	handlePressBack: function()
	{
		
		
		var column = this.getView().byId("today1").getText();
		var date = new Date(column);
		date.setFullYear(date.getFullYear());
		date.setMonth(date.getMonth());
		date.setDate(date.getDate()-28);		

		this.calculWeek(date);	
		this.getEmployees(this.calcul_date(this.getView().byId("today1").getText()), this.calcul_date(this.getView().byId("today31").getText()));
		
	},
	
	handlePressUp: function()
	{
		var column = this.getView().byId("today1").getText();	
		var date = new Date(column);
		date.setFullYear(date.getFullYear());
		date.setMonth(date.getMonth());
		date.setDate(date.getDate()+28);
		this.calculWeek(date);
		this.getEmployees(this.calcul_date(this.getView().byId("today1").getText()), this.calcul_date(this.getView().byId("today31").getText()));
	},
	
	handleChangePress: function()
	{
		
		var datepicker = this.getView().byId("datePicker").getValue();
		var date = new Date(datepicker);
		date = new Date(date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()));
		this.calculWeek(date);
		this.getEmployees(this.calcul_date(this.getView().byId("today1").getText()), this.calcul_date(this.getView().byId("today31").getText()));
		
	},
	
	

	handlebackPage: function()
	{
		sap.ui.getCore().byId("myApp").back();	
		
	},
	
	hanldeAskRequest: function()
	{
		sap.ui.getCore().byId("myApp").to("CalendarId");
		
	},
	
	
	handleConsultRequest: function()
	{
		var request =  sap.ui.getCore().byId("ShowRequestId");
		request.getController().getHoliday();	
		request.getController().getRequestManager();
		
	    sap.ui.getCore().byId("myApp").to("ShowRequestId");
	},
	
	handlePressAdmin: function()
	{
			
				var admin = sap.ui.getCore().byId("AdminId");	
				admin.getController().getTeam();

	}
	

});