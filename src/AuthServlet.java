

import java.io.IOException;

import javax.security.auth.login.LoginContext;
import javax.security.auth.login.LoginException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sap.security.auth.login.LoginContextFactory;


public class AuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public AuthServlet() {
        super();
          }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getRemoteUser();
	    if (user != null) {
	      response.getWriter().println( user);
	    } else
	    {
	      LoginContext loginContext;
			      try {
			        loginContext = LoginContextFactory.createLoginContext("SAML2");
			        loginContext.login();
			        response.getWriter().println(request.getRemoteUser());
			
			      } catch (LoginException e) {
			        e.printStackTrace();
			      }
	    }
	    
	}

}
