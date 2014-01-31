package models;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.persistence.Entity;

import play.db.jpa.Model;
import sample.SampleRandom;

@Entity
public class TodoItem extends Model {

	public String content;
	
	public String deadLine;
		
	private String createdDate;
	
	public boolean isDone;
	
	private String _session;
	
	private String item_id;
	
	public TodoItem() {
		
	}
	
	public TodoItem(String content, String deadline, String sessi0n) {
		this.content = content;
		this.deadLine = deadline;		
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd", Locale.JAPAN);
		Date today = new Date();
		this.createdDate = dateFormat.format(today);		
		this.item_id = SampleRandom.generateRandomId();			
		this._session = sessi0n;
		this.isDone = false;
	}
	
	public String getContent() {
		return this.content;
	}
	
	public String getCreated() {
		return this.createdDate;
	}
	
	public String getItemId() {
		return item_id;
	}
	
}
