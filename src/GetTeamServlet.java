

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import jsonFile.Team;

import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoTable;


public class GetTeamServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
  
    public GetTeamServlet() {
        super();
        
    }

	
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		
		response.setContentType("text/html");
		response.getWriter().write(generateJSonData());
	}
	
		
	public String generateJSonData()
		{
			Team team = new Team();
			
		try {
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			JCoFunction function;		
			 function = destination.getRepository().getFunction("ZFM_SELECT_TEAM");

			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 
			
 
			JCoTable selectTeam = function.getTableParameterList().getTable("T_TEAM");
			
			
			 for (int i = 0; i < selectTeam.getNumRows() ; i++)
	    		{
				 
				 selectTeam.setRow(i);
				 team.insert(selectTeam.getString("ID_TEAM"),selectTeam.getString("NAME_TEAM"));
				 team.add();
	    		}	
			 
			
			 
		} catch (JCoException e) {
			
			e.printStackTrace();
		
		}
		
		return  team.filt();
		
		
	}

}
