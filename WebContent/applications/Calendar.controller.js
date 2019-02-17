sap.ui.controller("applications.Calendar", {

	
	 oFormatYyyymmdd: null,

	  onInit: function() {
	    this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: "dd-MM-yyyy"}); // Change Date format
	  },

	  handleCalendarSelect: function(oEvent) {
	    var oCalendar = oEvent.oSource;
	    this._updateText(oCalendar);
	  },

	  _updateText: function(oCalendar) {
	    var oSelectedDateFrom = this.getView().byId("selectedDateFrom");
	    var oSelectedDateTo = this.getView().byId("selectedDateTo");
	    var aSelectedDates = oCalendar.getSelectedDates();
	    var oDate;
	    var today = new Date();

	    if (aSelectedDates.length > 0 ) {
	      oDate = aSelectedDates[0].getStartDate();
	      if(oDate){
		        oSelectedDateFrom.setText(this.oFormatYyyymmdd.format(oDate));
	      }
	      else {
		    oSelectedDateFrom.setText("No date Selected");
	        oSelectedDateTo.setText("No Date Selected");
	      }
	      oDate2 = aSelectedDates[0].getEndDate();
	      if (oDate2<oDate && oDate2<today) {
		       oSelectedDateTo.setText("No date selected");
	      }
	      else{
		       oSelectedDateTo.setText(this.oFormatYyyymmdd.format(oDate2));
	      }
	     
	    } else {
	      oSelectedDateFrom.setText("No Date Selected");
	      oSelectedDateTo.setText("No Date Selected");
	    }
	  },

	  handleSelectThisWeek: function(oEvent) {
	    this._selectWeekInterval(6);
	  },

	  handleSelectWorkWeek: function(oEvent) {
	    this._selectWeekInterval(4);
	  },

	  _selectWeekInterval: function(iDays) {
		var today = new Date();
	    var oCurrent = new Date();
		oCurrent.setDate(today.getDate()+7);
	    var iWeekstart = oCurrent.getDate() - oCurrent.getDay() +1;
	    var iWeekend = iWeekstart + iDays;       // end day is the first day + 6
	    var oMonday = new Date(oCurrent.setDate(iWeekstart));
	    var oSunday = new Date(oCurrent.setDate(iWeekend));

	    var oCalendar = this.getView().byId("calendar");

	    oCalendar.removeAllSelectedDates();
	    oCalendar.addSelectedDate(new sap.ui.unified.DateRange({startDate: oMonday, endDate: oSunday}));

	    this._updateText(oCalendar);
	  },
	  
	  rad : function (radioGroup){
			var res = false;
			var n = radioGroup.length;
			// Je parcours mes radio afin de voir si une d'elle est à l'etat "checked"
			for (var i=0;i<n;i++){
				if (radioGroup[i].checked){
					res = true;
				}
			}
			return res;
		},

	  
	  onPress: function(oEvent) { 
		  
		  var user_name  = this.getView().byId("headerId").getUserName();
		  var user = user_name.replace(["\n"], "")
		  
		   
		  
		  var departureDate = this.getView().byId("selectedDateFrom").getText();
		  var arrivalDate = this.getView().byId("selectedDateTo").getText();
		 
		  var btnR = this.getView().byId("btnRadio");
		  var btnR2 = this.getView().byId("return");
		  var btnR3 = this.getView().byId("hollydayType");
		  var reason = this.getView().byId("reason").getValue();
		  var date1 = new Date(2015, departureDate.substring(3,5)-1, departureDate.substring(0,2));
		  var n = date1.getTime();
		  var date2 = new Date(2015, arrivalDate.substring(3,5)-1, arrivalDate.substring(0,2));
		  var n2 = date2.getTime();
		  var n3 = ((n2-n)/86400000)+1;
		  var jour = date1.getDay();
		  var n0 = 0;
		
		  
		  
		  var dateTest = new Date(2015, 5-1, 08);
		  date1.setDate(date1.getDate()+1);
		  

		  /***********************************************************************/
		  var begin_date = departureDate.split("-").reverse().join("");
		  var end_date = arrivalDate.split("-").reverse().join("");
		  var departure_time;
		  var arrival_time;
		  var type_request;
		  
		  if(btnR.getSelectedItem().getText() == "Afternoon")
			  departure_time = "PM";
		  else
			  departure_time = "AM";
				  
		  if(btnR2.getSelectedItem().getText() == "Afternoon")
			  arrival_time = "PM";
		  else
			  arrival_time = "AM";
		  
		 
		  if(btnR3.getSelectedItem().getText() == "Hollyday")
			  type_request = "H";
		  else
			  type_request = "T";
				  
		  
		  /***********************************************************************/
		
		  
		  while(date1 <= date2){
			  if(date1.getDay()==0 || date1.getDay()==1){
				  date1.setDate(date1.getDate()+1);
			  }
			  else{
				  n0 = n0+1;
				  date1.setDate(date1.getDate()+1);
			  }
		  }
		  
		  var nbSemiDays = n0*2;
		  if(btnR.getSelectedItem().getText()=="Afternoon"){
				nbSemiDays = nbSemiDays -1;
			}
		  if(btnR2.getSelectedItem().getText()=="Afternoon"){
				nbSemiDays = nbSemiDays +1;
			} 
		  
		  if(departureDate==arrivalDate){
			  if((btnR.getSelectedItem().getText()=="Afternoon")||((btnR.getSelectedItem().getText()=="Morning")&&(btnR2.getSelectedItem().getText()=="Morning"))){
				  alert("Wrong dates selected");
			  }
			  else{
				  	if(departureDate=="No Date Selected"){
				  		finalDeparture="No departure dates selected";
				  	}
				  	if(arrivalDate=="No Date Selected"){
				  		finalArrival="No arrival dates selected";
				  	}
				  	if(departureDate=="Please select a good date"){
				  		finalDeparture="You have choosen a past date";
				  	}
				  	if(arrivalDate=="Please select a good date"){
				  		finalArrival="You have choosen a past date";
				  	
				  	}
				  	
					 this.RequestValidate(user, begin_date, departure_time, end_date, arrival_time, type_request, reason);
					 this.sendMail(user);
						

				 		sap.ui.getCore().byId("myApp").to("ShowRequestId");
			  
			  }
		  }
		  else if((n3<3)&&(date1.getDay()==0 || date1.getDay()==1) && (date2.getDay()==0 || date2.getDay()==1)){
			  	alert("You selected only non working days");
		  }
		  else{
		  	if(departureDate=="No Date Selected"){
		  		finalDeparture="No departure dates selected";
		  	}
		  	if(arrivalDate=="No Date Selected"){
		  		finalArrival="No arrival dates selected";
		  	}

		  	this.RequestValidate(user, begin_date, departure_time, end_date, arrival_time, type_request, reason);
		  	
		  	

	 		sap.ui.getCore().byId("myApp").to("ShowRequestId");
	 		
		  }


 },
 
 handlebackPage: function()
	{
		sap.ui.getCore().byId("myApp").back();	
		
	},
	
	
	RequestValidate: function(bname, begin_date, departure_time, end_date, arrival_time, type_request, raison_request)
	{
		var that = this.getView();
	
		$.ajax({
		
		url : "/DanoneProject/AskRequest" ,
		type : 'GET',
		
		data : {
			 'bname' : bname,
			 'begin_date' : begin_date,
			 'departure_time' : departure_time,
			 'end_date' : end_date ,
			 'arrival_time' : arrival_time,
			 'type_request' : type_request,
			 'raison_request' : raison_request 
		},
		success :			function() {
			
			setTimeout(function(){
				
				var request =  sap.ui.getCore().byId("ShowRequestId");
				request.getController().getHoliday();	
				request.getController().getRequestManager();
				that.getController().sendMail(bname);				
			 			    }, 1);
								
								
								},
										
		
		error : 
								function(data) {
									console.log("Error : " + data.responseText);
								},
		async : true
		}); 
	

 
 
	},
	
	sendMail : function(bname)
	{
		$.ajax({
			
			url : "/DanoneProject/SendEmail" ,
			type : 'GET',
			
			data : {
				 'sender' : bname,
				
			},
			success :			function() {
				
			
									
									},
											
			
			error : 
									function(data) {
										console.log("Error : " + data.responseText);
									},
			async : true
			}); 
		
		
	}

 
 
	  
	});



