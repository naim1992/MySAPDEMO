

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import jsonFile.Team_s_employees;

import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;


public class GetTeamEmployees extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public GetTeamEmployees() {
        super();
      
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		String id_team = request.getParameter("id_team");
		
		response.getWriter().write(generateJSonData(id_team));
	}

	
	public String generateJSonData(String id_team)
	{

		Team_s_employees emp = new Team_s_employees();
		
		
		try {
			
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			
			JCoFunction function;
			
			
			
			
			 function = destination.getRepository().getFunction("ZFM_SELECT_EMPLOYEES");
			 
			 JCoParameterList input = function.getImportParameterList();
			 
			 input.setValue("ID_TEAM",id_team);
			 
			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 
			
 
			JCoTable selectEmployee = function.getTableParameterList().getTable("T_EMPLOYEE");
			
			
			 for (int i = 0; i < selectEmployee.getNumRows() ; i++)
	    		{
				 
				 selectEmployee.setRow(i);
				 emp.insert(selectEmployee.getString("BNAME"), selectEmployee.getString("MANAGER"), selectEmployee.getString("ID_TEAM"));

				 emp.add();
	    		}			 
			   
		} catch (JCoException e) {
			
			e.printStackTrace();
		}
		
		
		return emp.filt();
		
	}
}
