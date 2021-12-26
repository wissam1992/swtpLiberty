package demo.api;

import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import demo.api.security.AccessManager;
import demo.model.User;
import demo.model.UserManager;

@Path("/register")
@Singleton
public class RegisterController
{
   
   @Inject
   UserManager userManager;

   @Inject
   AccessManager accessController;

   @POST
   @Consumes(MediaType.APPLICATION_JSON)
   public Response register(User user)
   {     
      try
     
      { System.out.println("In controller");
         System.out.println(user);
         this.userManager.register(user);
         UUID uuid = this.accessController.login(user.getUsername());
         NewCookie loginCookie = new NewCookie("LoginID", uuid.toString());
         return Response.status(200).cookie(loginCookie).build();
      }
      catch (Exception exce)
      {
         System.out.println("ERROR " + exce.getMessage() );
         return Response.status(404).build();
      }
   }
}
