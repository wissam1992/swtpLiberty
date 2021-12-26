package demo.model;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.util.Objects;


@SuppressWarnings("serial")
public class Note implements Serializable
{
   private  int id;
   private  String subject;
   private  String content;
   private  String creationDate;
   
   public Note()
   {
      
   }
   
   public Note(int id, String subject, String content)
   {
      Objects.requireNonNull(subject);
      Objects.requireNonNull(content);
      
      this.id = id;
      this.subject = subject.length() == 0 ? "---" : subject;
      this.content = content.length() == 0 ? "---" : content;
      
      ZonedDateTime  date = ZonedDateTime.now();
      this.creationDate = date.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL, FormatStyle.MEDIUM).withLocale(Locale.GERMAN));
   }

   public int getId()
   {
      return id;
   }

   public String getSubject()
   {
      return subject;
   }

   public String getContent()
   {
      return content;
   }

   public String getCreationDate()
   {
      return creationDate;
   }

   @Override
   public String toString()
   {
      return "Note [id=" + id + ", subject=" + subject + ", content=" + content + ", creationDate=" + creationDate + "]";
   }
}
