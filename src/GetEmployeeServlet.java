

import java.io.IOException;





import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;






import jsonFile.Employees;

import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;


public class GetEmployeeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    
    public GetEmployeeServlet() {
    	super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	
		response.setContentType("text/html");
		String bname = request.getParameter("bname");
		String date_begin = request.getParameter("begin_date");
		String date_fin = request.getParameter("end_date");
		
		response.getWriter().write(generateJSonData(bname,date_begin, date_fin));
		
		
	}
	
	public String generateJSonData(String bname, String date_begin, String date_fin)
	{

		Employees emp = new Employees();
		
		
		try {
			
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			
			JCoFunction function;
			
			 function = destination.getRepository().getFunction("ZFM_DISPLAY_HOLIDAY");
			
			 JCoParameterList input = function.getImportParameterList();
			 input.setValue("I_BNAME", bname);
			 input.setValue("I_BEGIN_DATE", date_begin);
			 input.setValue("I_END_DATE", date_fin);
			 
			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 
			
 
			JCoTable selectEmployee = function.getTableParameterList().getTable("LT_TEAM_HOLIDAY");
			JCoTable nbr_day_worked = function.getTableParameterList().getTable("LT_NBR_DAY_WORKED");
			
			
			 for (int i = 0; i < selectEmployee.getNumRows() ; i++)
	    		{
				 
				 selectEmployee.setRow(i);
				 emp.insert(selectEmployee.getString("BNAME"), selectEmployee.getString("DATE"), selectEmployee.getString("MOORNING"), selectEmployee.getString("AFTERNOON"));
				
	    		}			 
			   
			 for(int i = 0; i < nbr_day_worked.getNumRows() ; i++)
			 {
				 nbr_day_worked.setRow(i);
				 emp.insertDayWorked(nbr_day_worked.getString("BNAME"),nbr_day_worked.getString("NBR_DAY_WORKED"));
			 }
			 
		} catch (JCoException e) {
			
			e.printStackTrace();
		}
		
		
		return emp.filt();
		
	}
 

}
