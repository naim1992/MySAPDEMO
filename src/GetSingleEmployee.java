

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jsonFile.Employee;


import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;

public class GetSingleEmployee extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public GetSingleEmployee() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String employee_name = request.getParameter("bname");
		String begin_date = request.getParameter("begin_date");
		String end_date = request.getParameter("end_date");
		
		response.setContentType("text/html");
		response.getWriter().write(generateJSonData(employee_name, begin_date, end_date));
		
		
	}
	
	public String generateJSonData(String employee_name,String date_begin,String date_fin)
	{

		Employee emp = new Employee();
		
		
		try {
			
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			
			JCoFunction function;
			JCoFunction function1;
			
			
			
			 function = destination.getRepository().getFunction("ZFM_SELECT_EMPLOYEES");
			 JCoParameterList input = function.getImportParameterList();
			 input.setValue("I_BNAME", employee_name);
			 

			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 
			 JCoTable selectEmployee = function.getTableParameterList().getTable("T_EMPLOYEE");
				
			 
			 function1 = destination.getRepository().getFunction("ZFM_DISPLAY_HOLIDAY");
			 JCoParameterList input1 = function1.getImportParameterList();

			 input1.setValue("I_BEGIN_DATE", date_begin);
			 input1.setValue("I_END_DATE", date_fin);
			
			 for (int i = 0; i < selectEmployee.getNumRows(); i++)
	    		{
				 
				 selectEmployee.setRow(i);
				 emp.insert(selectEmployee.getString("BNAME"));
				 	
				
				 input1.setValue("I_BNAME",selectEmployee.getString("BNAME"));
				 try
			        {			            
			            function1.execute(destination);
			        }
			       
				 catch(AbapException e)
			        {
			        	
			            System.out.println(e.toString());
			          
			        }
				 
				 
				 JCoTable dayTypes = function1.getTableParameterList().getTable("LT_DAY_TYPES");
				 
				 for(int j=0; j< dayTypes.getNumRows(); j++)
				 {
					 dayTypes.setRow(j);
					 emp.insertDays(dayTypes.getString("DATE"),dayTypes.getString("DATE_TYPE")); 
				 }
				 
				
				 emp.add();
				
	    			
				 
			   
	    	}
		} catch (JCoException e) {
			
			e.printStackTrace();
		}
		
		
		return emp.filt();
		
	}


	
	

}
