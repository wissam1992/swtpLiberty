package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Singleton;
import javax.sql.DataSource;



import demo.model.User;

@Singleton
public class Person{
	@Resource(lookup = "jdbc/mySQL")
    private DataSource dataSource;
    
    public User getUser() throws SQLException{

        Connection connection=dataSource.getConnection();
         PreparedStatement statement=connection.prepareStatement("select * from rateme_user");
         ResultSet res=statement.executeQuery();
         final User user=new User();
         while(res.next()){
             user.setUsername(res.getString("username"));
             user.setPassword(res.getString("password"));
         }
         connection.close();
        return user;

        
    }
    public Map<String,User> getUsers() throws SQLException{

        Connection connection=dataSource.getConnection();
         PreparedStatement statement=connection.prepareStatement("select * from rateme_user");
         ResultSet res=statement.executeQuery();
         final Map<String,User>users=new HashMap<>();
         while(res.next()){
             User user=new User();
             final String username=res.getString("username");
             user.setUsername(res.getString("username"));
             user.setPassword(res.getString("password"));
             user.setUser_id(res.getInt("user_id"));
             user.setSalt(res.getString("salt"));
             users.put(username, user);
         }
         connection.close();
        return users;
    }
    public void addUser(User user) throws SQLException{
        Connection connection=dataSource.getConnection();
        String sql = "INSERT INTO rateme_user(username,E_Mail,firstname,lastname,street,streetNr,zip,city,password,salt) VALUES (?,?,?,?,?,?,?,?,?,?)";        PreparedStatement statement =connection.prepareStatement(sql);
        statement.setString(1, user.getUsername());
        statement.setString(2, user.getEmail());
        statement.setString(3, user.getFirstname());
        statement.setString(4, user.getLastname());
        statement.setString(5, user.getStreet());
        statement.setString(6, user.getStreetNr());
        statement.setString(7, user.getZip());
        statement.setString(8, user.getCity());
        statement.setString(9, user.getPassword());
        statement.setString(10, user.getSalt());
        statement.executeUpdate();
        connection.close();
        System.out.println("User is inserted");


    }
    


}