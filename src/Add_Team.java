

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;


public class Add_Team extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public Add_Team() {
        super();
        
    }

	
	
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			JCoFunction function;
			
			
			 function = destination.getRepository().getFunction("ZFM_ADD_TEAM");
			 JCoParameterList input = function.getImportParameterList();
			 
			 String id_team = request.getParameter("id_team");
			 String name_team = request.getParameter("name_team");
			
			 
			 input.setValue("ID_TEAM",id_team);
			 input.setValue("NAME_TEAM",name_team);
			 
			 
			 
			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 
			 
			 
			 
			 
			 
		} catch (JCoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
	}


}
