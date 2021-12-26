package demo.api;

import java.util.Optional;
import java.util.UUID;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import demo.api.security.AccessManager;
import demo.model.NoteContainer;
import demo.model.User;
import demo.model.UserManager;

@Path("/notes")
@Singleton
public class NoteController
{
   static public class NoteInputData
   {
      private String subject;
      private String content;
      
      public String getSubject()
      {
         return subject;
      }
      public void setSubject(String subject)
      {
         this.subject = subject;
      }
      public String getContent()
      {
         return content;
      }
      public void setContent(String content)
      {
         this.content = content;
      }
   }
   
   
   @Inject
   AccessManager accessManager;
   
   @Inject
   UserManager userManager;

   
   @GET
   @Produces(MediaType.APPLICATION_JSON)
   public Response getNotes(@CookieParam("LoginID") String loginId)
   {
      // Access-controll
      UUID  uuid = UUID.fromString(loginId);
      if( this.accessManager.isLoggedIn(uuid) == false )
      {
         System.out.println("ERROR Access not allowed");
         return Response.status(404, "Not logged in").build();
      }
      
      Optional<String> username = accessManager.getLoginName( UUID.fromString(loginId) );
      if(  username.isPresent() == false )
      {
         System.out.println("ERROR Username not found");
         return Response.status(403, "User not found").build();
      }
      
      // Check user
      Optional<User> user = userManager.lookupUser(username.get());
      if( user.isPresent() == false )
      {
         System.out.println("ERROR User not found");
         return Response.status(404, "User not found").build();
      }
      
      NoteContainer notes = user.get().getNotes();
      
      return Response.ok().entity(notes).build();
   }
   
   @POST
   @Consumes(MediaType.APPLICATION_JSON)
   public Response addNote(NoteInputData noteInput, @CookieParam("LoginID") String loginId)
   {
     // Access-controll
      UUID  uuid = UUID.fromString(loginId);
      if( this.accessManager.isLoggedIn(uuid) == false )
      {
         System.out.println("ERROR Access not allowed");
         return Response.status(404, "Not logged in").build();
      }

      Optional<String> username = accessManager.getLoginName( UUID.fromString(loginId) );
      if( username.isPresent() == false )
      {
         System.out.println("ERROR Username not found");
         return Response.status(404, "Not logged in").build();
      }
      
      // Check user
      Optional<User> user = userManager.lookupUser(username.get());
      if( user.isPresent() == false )
      {
         System.out.println("ERROR User not known");
         return Response.status(404, "User not found").build();
      }
      
      NoteContainer notes = user.get().getNotes();
      notes.addNote(noteInput.subject, noteInput.content);
      
      return Response.ok().build();
   }
   
   
   @DELETE
   @Produces(MediaType.APPLICATION_JSON)
   public Response clearNotes(@CookieParam("LoginID") String loginId)
   {
      // Access-controll
      UUID  uuid = UUID.fromString(loginId);
      if( this.accessManager.isLoggedIn(uuid) == false )
      {
         System.out.println("ERROR Access not allowed");
         return Response.status(404, "Not logged in").build();
      }
           
      Optional<String> username = accessManager.getLoginName( UUID.fromString(loginId) );
      if( username.isPresent() == false )
      {
         System.out.println("ERROR User not found");
         return Response.status(404, "Not logged in").build();
      }
      
      Optional<User> user = userManager.lookupUser(username.get()); 
      user.ifPresent( u -> u.getNotes().clear() );
      
      return Response.ok().build();
   }
  
}
