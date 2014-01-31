package controllers;

import play.mvc.Controller;
import play.mvc.results.Result;


public class Application extends Controller {

    public static void index() {
    	
    	if (session.get("cookie") == null)
    		Login.index();
    	else
    		Todo.index();
    }
}
