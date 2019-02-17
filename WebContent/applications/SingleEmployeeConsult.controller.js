sap.ui.controller("applications.SingleEmployeeConsult", {
		
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
		
		
		departure_date : function()
		{
			
			var that =  sap.ui.getCore().byId("SingleEmployeeConsultId");
			var date = new Date( this.byId("column1Id").getText());
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
		
		arrival_date : function()
		{
			
			var that =  sap.ui.getCore().byId("SingleEmployeeConsultId");
			var date = new Date(that.byId("column28Id").getText());
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
		
		
		
		getEmployee : function(bname)
		{
			var that =  sap.ui.getCore().byId("SingleEmployeeConsultId");
			var begin_date = that.getController().departure_date();
			var end_date = that.getController().arrival_date();

			$.ajax({
				dataType : 'json',
				url : "/DanoneProject/GetSingleEmployee" ,
				type : 'GET',
				data : {
					 'bname' : bname,
					 'begin_date' : begin_date,
					 'end_date' : end_date,
				},
				
				contentType: "application/json",
				success :			function(data) {
					
										
									var resultModel = new sap.ui.model.json.JSONModel();
										resultModel.setData({
										modelData : data.employee 
											
										});
										
										
										that.byId("table").setModel(resultModel);
										that.byId("table2").setModel(resultModel);
										that.byId("table3").setModel(resultModel);
										that.byId("table4").setModel(resultModel);
										
										for(i=1; i<29; i++)
										{
										var date = new Date( that.byId("column"+ (i)+ "Id").getText());
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
										
										
										date = year+"-"+month+"-"+day;
										
										that.byId("b1t"+i).bindProperty("text", date);  
										that.byId("b2t"+i).bindProperty("text", date);
										
										
						
										
										}
										
										
										
										that.byId("table").bindRows("/modelData");
										that.byId("table2").bindRows("/modelData");
										that.byId("table3").bindRows("/modelData");
										that.byId("table4").bindRows("/modelData");
										
										that.byId("table").rerender();
										that.byId("table2").rerender();
										that.byId("table3").rerender();
										that.byId("table4").rerender();
										
									
										
										
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
			var date2 = new Date();	
			
			for(i=1; i<29; i++)
			{							
				date2.setFullYear(date.getFullYear());				
				date2.setMonth(date.getMonth());					
				date2.setDate(day);									
				
			this.getView().byId("column"+ (i)+ "Id").setText(date2.toDateString());
	
			day++;
			
			}
		
			
			date = new Date(this.getView().byId("column1Id").getText());
			
			this.getView().byId("month").setText(this.months(date.getMonth()) + " " + date.getFullYear());
			
		},
		
		
		
		handlePressBack: function()
		{
			
			var column = this.getView().byId("column1Id").getText();
			var date = new Date(column);
			
			
			date = new Date(date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()-28));
			this.calculWeek(date);	
			
			
			this.getEmployee(this.getView().byId("table").getTitle().getText());
			
		},
		
		handlePressUp: function()
		{
			var column = this.getView().byId("column1Id").getText();
			var date = new Date(column);
			
			
			date = new Date(date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()+28));
			this.calculWeek(date);
			
			
			this.getEmployee(this.getView().byId("table").getTitle().getText());
			
		},
		
		handleChangePress: function()
		{
			var datepicker = this.getView().byId("datePicker").getValue();
			var date = new Date(datepicker);
			date = new Date(date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate()));
			this.calculWeek(date);
			
			
			this.getEmployee(this.getView().byId("table").getTitle().getText());
		},
		
		
		askRequest: function(oEvent)
		{
			
			var myButton = oEvent.getSource();
			
			myButton.setType("Reject");
		
		},
		

		handlebackPage: function()
		{
			sap.ui.getCore().byId("myApp").back();	
			
		},
		
		hanldeAskRequest: function()
		{
			sap.ui.getCore().byId("myApp").to("CalendarId");
			
		}
		
		
		
		
		






});