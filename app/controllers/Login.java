package controllers;

import java.util.HashMap;
import java.util.Map;

import models.User;
import play.mvc.Controller;
import sample.HashSample;

public class Login extends Controller {

	public static boolean isRemember = false;

	public static void index() {
		if (session.get("cookie") == null)
			render();					// if there isn't any logged in session then render the login page
		else
			Application.index();		// otherwise, render the todo page.
	}

	/*
	 * doLogin() will be call in Login/index.html
	 * 
	 * after clicking "Login" button
	 */
	public static void _doLogin() {
		/*
		 * on "Login" button click listener
		 */
		String in_name = params.get("login");
		User checkUser = User.find("user_name=\'" + in_name + "\'").first();
		if (checkUser == null) {
			// inputed username does not exist
			index();
			return;
		}

		String in_pass = HashSample.getSHA256(in_name + params.get("password"));
		if (!in_pass.equals(checkUser.getPass())) {
			// password does not match
			index();
			return;
		} else {
			//				if (params.get("remember_me").equals("on")) {
			//					session.put("cookie", HashSample.getSHA256(checkUser.getUserName() + checkUser.getEmail()));
			//				}
			session.put("cookie", HashSample.getSHA256(checkUser.getUserName() + checkUser.getEmail()));
			Application.index();
			return;
		}

	}

	public static void dologin() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();

		/*
		 * on "Login" button click listener
		 */
		String in_name = params.get("login");
		User checkUser = User.find("user_name=\'" + in_name + "\'").first();
		
		if (checkUser == null) {
			// inputed username does not exist
			result = "false";

		} else {

			String in_pass = HashSample.getSHA256(in_name + params.get("password"));
			if (!in_pass.equals(checkUser.getPass())) {
				// password does not match
				result = "false";

			} else {
				session.put("cookie", HashSample.getSHA256(checkUser.getUserName() + checkUser.getEmail()));
				result = "true";			
			}
		}

		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}
	
	public static void goSignup() {
		Signup.index();
	}

	public static void logout() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();
		
		if (session != null) {
			session.clear();
			result = "Ok";
		} else {
			result = "Ok";
		}
		
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}
}
