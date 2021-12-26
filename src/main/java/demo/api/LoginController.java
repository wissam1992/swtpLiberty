package demo.api;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import demo.api.security.AccessManager;
import demo.api.security.PasswordEnc;
import demo.model.User;
import demo.model.UserManager;

@Path("/login")
@Singleton
public class LoginController
{
   @Inject
   AccessManager accessManager;

   @Inject
   UserManager userManager;

   @POST
   @Consumes(MediaType.APPLICATION_JSON)
   public Response login(User user)
   {    
      String pass="";
      try
      {
         Optional<User> optUser = this.userManager.lookupUser(user.getUsername());
         if( optUser.isPresent() )
         {
            //Check Password
            pass=decodePass(user, optUser.get().getSalt());
            user.setPassword(pass);
            if( user.getPassword().equals( optUser.get().getPassword()) == false )
            {
               throw new RuntimeException("Wrong Password");
            }
            
            //Login
            UUID uuid = this.accessManager.login(user.getUsername());
            NewCookie loginCookie = new NewCookie("LoginID", uuid.toString());
            return Response.status(200).cookie(loginCookie).build();
         }
         else
         {
            throw new RuntimeException("User not known");
         }
      }
      catch (Exception exce)
      {
         System.out.println("ERROR " + exce.getMessage() );
         return Response.status(404).build();
      }
   }

   @DELETE
   @Consumes(MediaType.APPLICATION_JSON)
   public Response logout(@CookieParam("LoginID") String loginId)
   {
      try
      {
         this.accessManager.logout(UUID.fromString(loginId) );
         return Response.status(200).cookie( (NewCookie) null).build();
      }
      catch (Exception exce)
      {
         System.out.println("ERROR " + exce.getMessage() );
         return Response.status(404).build();
      }
   }
   private String decodePass(User user, String saltU)
   {
      byte[]salt=Base64.getUrlDecoder().decode(saltU.getBytes());
      String pass=PasswordEnc.getSecurePass(user.getUsername(), salt);
      Response.ok("Password:"+pass).build();
      return pass;
   }
}
