

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

/**
 * Servlet implementation class SendEmail
 */
public class SendEmail extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendEmail() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			JCoDestination destination = JCoDestinationManager.getDestination("JCoDemoSystem");
			JCoFunction function;
			
			
			 function = destination.getRepository().getFunction("ZFM_MAIL_SENDING_PRG");
			 JCoParameterList input = function.getImportParameterList();
			 
			 String sender= request.getParameter("sender");
			
			
			 
			 input.setValue("I_SENDER",sender);
			 
			 
			 
			 
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
