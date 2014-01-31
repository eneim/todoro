package controllers;

import java.util.HashMap;
import java.util.Map;

import models.User;

import org.apache.commons.validator.routines.EmailValidator;

import play.mvc.Controller;
import sample.HashSample;

public class Signup extends Controller {

	public static void index() {
		render();
	}

	public static void checkusername() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();

		String user_name = params.get("user_name");

		if (user_name.length() < 5 || user_name.length() > 15) {
			result = "zero";
		} else {
			User checkUser = User.find("user_name=\'" + user_name + "\'").first();
			if (checkUser == null) {
				result = "Ok";
			}
		}
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}

	public static void checkemail() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();

		EmailValidator mailValidator = EmailValidator.getInstance();

		String email = params.get("email");

		boolean valid;

		valid = mailValidator.isValid(email);

		if (!valid) {
			result = "invalid";
		} else {
			User checkUser = User.find("email=\'" + HashSample.getSHA256(email) + "\'").first();
			if (checkUser == null) {
				result = "Ok";
			}
		}
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}

	public static void dosignup() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();

		User newUser;

		long user_id = 1L;
		if (!User.all().fetch().isEmpty())
			user_id = User.all().fetch().size() + 1;

		String user_name = params.get("user_name").toString();
		String email = HashSample.getSHA256(params.get("email").toString());		
		String password = HashSample.getSHA256(user_name + params.get("password").toString());

		if (user_name != null && email != null && password != null) {

			User checkUser = User.find("user_name=\'" + user_name + "\' OR email=\'" + email + "\'").first();

			if (checkUser != null) {
				result = "false";
			} else { 
				newUser = new User(user_id, user_name, email, password);
				newUser.setSession();
				newUser.save();
				renderArgs.put("user", newUser);			// put this user to the table user in database
				session.put("cookie", HashSample.getSHA256(newUser.getUserName() + newUser.getEmail()));	// put this user_id to session
				result = "done";
			}
		} else {
			result = "false";
		}
		
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}

	public static void _doSignup() {
		User newUser;

		long user_id = 1L;
		if (!User.all().fetch().isEmpty())
			user_id = User.all().fetch().size() + 1;

		String user_name = params.get("user_name").toString();
		String email = HashSample.getSHA256(params.get("email").toString());		
		String password = HashSample.getSHA256(user_name + params.get("password").toString());

		User checkUser = User.find("user_name=\'" + user_name + "\' OR email=\'" + email + "\'").first();

		if (checkUser != null) {
			index();
		} else { 
			newUser = new User(user_id, user_name, email, password);
			newUser.save();
			renderArgs.put("user", newUser);			// put this user to the table user in database
			session.put("cookie", HashSample.getSHA256(newUser.getUserName() + newUser.getEmail()));	// put this user_id to session
			Application.index();

		}
	}
}
