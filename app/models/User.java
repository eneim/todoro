package models;

import javax.persistence.Entity;

import play.data.validation.Check;
import play.data.validation.Required;
import play.db.jpa.Model;
import sample.HashSample;

/*
 * ref: http://undersourcecode.blog62.fc2.com/blog-entry-121.html
 */
@Entity
public class User extends Model {

	private long user_id;
	
	private String user_name;
	
	private String password;
	
	private String email;
	
	private String _session;
	
	public User(long id, String name, String email, String password) {
		this.user_id = id;
		this.user_name = name;
		this.email = email;
		this.password = password;
	}
	
	public void setSession() {
		this._session = HashSample.getSHA256(this.getUserName() + this.getEmail());
	}
	
	public String getUserName() {
		return this.user_name;
	}
	
	public long getUserId() {
		return this.user_id;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public String getPass() {
		return this.password;
	}
}
