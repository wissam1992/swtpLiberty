package demo.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@SuppressWarnings("serial")
public class NoteContainer implements Serializable, Iterable<Note>
{
   private int idCounter = 1;
   private final List<Note> notes = new ArrayList<>();
   
   public NoteContainer()
   {
      // empty
   }
   
   
   public boolean removeNote(int noteId)
   {
      Note tmp = null;
      for(Note note : this.notes )
      {
         if( note.getId() == noteId )
         {
            tmp = note;
            break;
         }
      }
      
      if( tmp != null )
      {
         this.notes.remove(tmp);
         return true;
      }
      else
      {
         return false;
      }
   }
   
   public Note addNote(Note note)
   {
      Note newNote = new Note( idCounter++, note.getSubject(), note.getContent());
      this.notes.add( newNote );
      return newNote;
   }
   
   public Note addNote(String subject, String content)
   {
      Note note = new Note( idCounter++, subject, content);
      this.notes.add( note );
      return note;
   }
   
   public void clear()
   {
      this.notes.clear();
   }

  
   public int getIdCounter()
   {
      return idCounter;
   }


   public void setIdCounter(int idCounter)
   {
      this.idCounter = idCounter;
   }


   public List<Note> getNotes()
   {
      return notes;
   }


   @Override
   public Iterator<Note> iterator()
   {
      return this.notes.iterator();
   }


   @Override
   public String toString()
   {
      return "NoteContainer [idCounter=" + idCounter + ", notes=" + notes + "]";
   }

   
}
