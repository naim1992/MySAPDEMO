

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


public class DeleteHoliday extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public DeleteHoliday() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			JCoFunction function;
			
			
			 function = destination.getRepository().getFunction("ZFM_CANCEL_HOLIDAY");
			 JCoParameterList input = function.getImportParameterList();
			 
			 String bname = request.getParameter("bname");
			 String begin_date = request.getParameter("begin_date");
			 String end_date = request.getParameter("end_date");

			
			
			 
			 input.setValue("I_BNAME",bname);
			 input.setValue("I_BEGIN_DATE",begin_date);
			 input.setValue("I_END_DATE",end_date);

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
