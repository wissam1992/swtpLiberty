package demo.model;


public class User
{
   private int user_id;
   private String username;
   private String password;
   private String email;
   private String lastname;
   private String firstname;
   private String street;
   private String streetNr;
   private String zip;
   private String city;
   private String salt;
///////////////
   private NoteContainer notes = new NoteContainer();
   public NoteContainer getNotes()
   {
      return this.notes;
   }
///////////////////////
   public User()
   {
      
   }
   

   public User(String username, String password)
   {
      super();
      this.username = username;
      this.password = password;
   }
   
   public User( String username, String email, String firstname, String lastname, String street,
   String streetNr, String zip, String city, String password) {
      System.out.println("In user");

this.username = username;
this.password = password;
this.email = email;
this.lastname = lastname;
this.firstname = firstname;
this.street = street;
this.streetNr = streetNr;
this.zip = zip;
this.city = city;

}

         public int getUser_id() {
      return user_id;
   }


   public void setUser_id(int user_id) {
      this.user_id = user_id;
   }


   public String getUsername() {
      return username;
   }


   public void setUsername(String username) {
      this.username = username;
   }


   public String getPassword() {
      return password;
   }


   public void setPassword(String password) {
      this.password = password;
   }


   public String getEmail() {
      return email;
   }


   public void setEmail(String email) {
      this.email = email;
   }


   public String getLastname() {
      return lastname;
   }


   public void setLastname(String lastname) {
      this.lastname = lastname;
   }


   public String getFirstname() {
      return firstname;
   }


   public void setFirstname(String firstname) {
      this.firstname = firstname;
   }


   public String getStreet() {
      return street;
   }


   public void setStreet(String street) {
      this.street = street;
   }


   public String getStreetNr() {
      return streetNr;
   }


   public void setStreetNr(String streetNr) {
      this.streetNr = streetNr;
   }


   public String getZip() {
      return zip;
   }


   public void setZip(String zip) {
      this.zip = zip;
   }


   public String getCity() {
      return city;
   }


   public void setCity(String city) {
      this.city = city;
   }


   public String getSalt() {
      return salt;
   }


   public void setSalt(String salt) {
      this.salt = salt;
   }


      



   @Override
   public int hashCode()
   {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((username == null) ? 0 : username.hashCode());
      return result;
   }

   @Override
   public boolean equals(Object obj)
   {
      if (this == obj)
         return true;
      if (obj == null)
         return false;
      if (getClass() != obj.getClass())
         return false;
      User other = (User) obj;
      if (username == null)
      {
         if (other.username != null)
            return false;
      } else if (!username.equals(other.username))
         return false;
      return true;
   }


   @Override
   public String toString() {
      return "User [city=" + city + ", email=" + email + ", firstname=" + firstname + ", lastname=" + lastname
            + ", password=" + password + ", salt=" + salt + ", street=" + street + ", streetNr=" + streetNr
            + ", user_id=" + user_id + ", username=" + username + ", zip=" + zip + "]";
   }

  

  
}
