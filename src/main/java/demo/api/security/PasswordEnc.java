package demo.api.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class PasswordEnc {
    public static byte[]getsalt() throws NoSuchAlgorithmException{

        //SecureRandom uses the SHA1PRNG algorithm to generate random values. 
        SecureRandom random=SecureRandom.getInstance("SHA1PRNG");
        byte[] salt=new byte[16];
        random.nextBytes(salt);
        return salt;
    }
    public static String getSecurePass(String passwordToHash,byte[]salt){
        String password=null;
        try {
            MessageDigest message = MessageDigest.getInstance("SHA-512");
        message.update(salt);

        byte[] bytes = message.digest(passwordToHash.getBytes());
        StringBuilder sb = new StringBuilder();
        for(int i=0; i<bytes.length;i++){
            sb.append(Integer.toString((bytes[i] & 0xff)+ 0x100, 16).substring(1));
        }
            password=sb.toString();
        
            
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            
        }
        return password;
        

    }
    
}
