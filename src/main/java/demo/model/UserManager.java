package demo.model;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Optional;
import java.util.Base64.Encoder;
import javax.inject.Inject;
import javax.inject.Singleton;
import db.Person;
import demo.api.security.PasswordEnc;

@Singleton
public class UserManager
{ 
    @Inject
   Person person;
   
   public UserManager()
   {
      super();
   }
   
   public Optional<User> lookupUser(String username)
   {

	   
      try {
         return this.person.getUsers().values().stream().filter( user -> user.getUsername().equals(username) ).findFirst();
      } catch (SQLException e) {
      
         e.printStackTrace();
         return null;
      }   }
   
   public void register(User user) throws NoSuchAlgorithmException, NoSuchProviderException
   {
      if( this.lookupUser( user.getUsername() ).isPresent() )
      {
         RuntimeException exce = new RuntimeException("User " + user + " exists");
         throw exce;
      }
      else
      {
         try{
            byte[]salt=PasswordEnc.getsalt();
            String password=user.getPassword();
            user.setPassword(PasswordEnc.getSecurePass(password, salt));
            Encoder encoder=Base64.getUrlEncoder().withoutPadding();
            String token=encoder.encodeToString(salt);
            user.setSalt(token);
            person.addUser(user);
            System.out.println("Register Done!");

         }
         catch(SQLException e){
            System.out.println("Failed");

         }
        
        
      }
   }
}
