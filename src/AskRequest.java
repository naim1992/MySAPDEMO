

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


public class AskRequest extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public AskRequest() {
        super();
        
    }

	
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			JCoFunction function;
			
			
			 function = destination.getRepository().getFunction("ZFM_ASK_HOLIDAY");
			 JCoParameterList input = function.getImportParameterList();
			 
			 String bname = request.getParameter("bname");
			 String begin_date = request.getParameter("begin_date");
			 String departure_time = request.getParameter("departure_time");
			 String end_date = request.getParameter("end_date");
			 String arrival_time = request.getParameter("arrival_time");
			 String type_request = request.getParameter("type_request");
			 String raison_request = request.getParameter("raison_request");
			 
			 
			 
			 input.setValue("I_BNAME",bname);
			 input.setValue("I_BEGIN_DATE",begin_date);
			 input.setValue("I_DEPARTURE_TIME",departure_time);
			 input.setValue("I_END_DATE",end_date);
			 input.setValue("I_ARRIVAL_TIME",arrival_time);
			 input.setValue("I_TYPE_REQUEST",type_request);
			 input.setValue("I_REASON_REQUEST",raison_request);
			 
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
