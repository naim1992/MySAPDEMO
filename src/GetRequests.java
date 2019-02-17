

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jsonFile.Request;

import com.sap.conn.jco.AbapException;
import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoFunction;
import com.sap.conn.jco.JCoParameterList;
import com.sap.conn.jco.JCoTable;


public class GetRequests extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    public GetRequests() {
        super();
        
    }

	
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
  	{
  		
  		response.setContentType("text/html");
  		String bname = request.getParameter("bname");
  		response.getWriter().write(generateJSonData(bname));
  	}
  	
  		
  	public String generateJSonData(String bname)
  		{
		Request requette = new Request();
		
		
		try {
			
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			
			JCoFunction function;		
			
			
			 function = destination.getRepository().getFunction("ZFM_SELECT_HOLIDAYS");
			 JCoParameterList input = function.getImportParameterList();
			 
			 input.setValue("I_BNAME", bname);
			
			 
			 try
		        {
		            function.execute(destination);
		           
		        }
		       
			 catch(AbapException e)
		        {
		        	
		            System.out.println(e.toString());
		          
		        }
			 

			JCoTable selectHoliday = function.getTableParameterList().getTable("LT_HOLIDAY");
			
			
			 for (int i = 0; i < selectHoliday.getNumRows() ; i++)
	    		{
				 selectHoliday.setRow(i);
				 requette.insert(selectHoliday.getString("BNAME"),selectHoliday.getString("BEGIN_DATE"),selectHoliday.getString("END_DATE"),selectHoliday.getString("STATUS_REQUEST"), selectHoliday.getString("REASON_REQUEST"));
				 requette.add();
	    		}			 
			   
		} catch (JCoException e) {
			
			e.printStackTrace();
		}
		
		return requette.filt();
	}

}
