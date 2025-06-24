package securenotes.model;

import jakarta.persistence.*;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @Column(length = 500000)
    private String image;

    private String category;
    private String dateTime;
    private boolean bookmarked;
    private boolean archived;
	public boolean isBookmarked() {
		// TODO Auto-generated method stub
		return false;
	}
	public void setBookmarked(boolean b) {
		// TODO Auto-generated method stub
		
	}
	public boolean isArchived() {
		// TODO Auto-generated method stub
		return false;
	}
	public void setArchived(boolean b) {
		// TODO Auto-generated method stub
		
	}

    // Getters and Setters
}
