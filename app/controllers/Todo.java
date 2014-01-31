package controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.TodoItem;
import models.User;
import play.mvc.Controller;

public class Todo extends Controller {

	public static void index() {
		String userSession = session.get("cookie");
//		List<TodoItem> items = TodoItem.find("_session=\'" + userSession + "\'").fetch();
		
		User user = User.find("_session=\'" + userSession + "\'").first();
		
		List<TodoItem> undone_items = TodoItem.find("_session=\'" + userSession + "\' AND isDone=\'FALSE\' ORDER BY deadline ASC").fetch();
		List<TodoItem> done_items = TodoItem.find("_session=\'" + userSession + "\' AND isDone=\'TRUE\' ORDER BY deadline DESC").fetch();
		render(undone_items, done_items, user);
	}

	public static void onDoneClickListener() {		
		index();
	}

	public static void addnew() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();
		
		String userSession = session.get("cookie");

		if (userSession == null)
			result = "false";
		else {
			String context = params.get("context");
			String deadline = params.get("deadline");
			
			TodoItem item = new TodoItem(context + "", deadline, userSession);
			item.save();

			renderArgs.put("item", item);			
			result = "true";
		}
				
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}

	public static void edititem() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();
		
		String itemid = params.get("itemid").substring(1);
		String newContent = params.get("context");
		TodoItem item = TodoItem.find("item_id=\'" + itemid + "\'").first();
	
		if (item == null)
			result = "false";
		else {
			item.content = newContent;
			item.save();			
			result = "Ok";
		}
		
		map.put("status", "Ok");
		map.put("result", result);
		renderJSON(map);
	}
	
	public static void ondone() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();
		
		String itemid = params.get("itemid");
		TodoItem item = TodoItem.find("item_id=\'" + itemid + "\'").first();
		
		if (item == null)
			result = "false";
		else {
			item.isDone = !item.isDone;
			item.save();			
			result = "Ok";
		}
		
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}

	public static void onclear() {
		String result = "false";
		Map<String, Object> map = new HashMap<String, Object>();
		
		String userSession = session.get("cookie");

		if (userSession == null)
			result = "false";
		else {
			TodoItem.delete("_session=\'" + userSession + "\' AND isDone=\'TRUE\'");
			result = "Ok";
		}
		
		map.put("status", "OK");
		map.put("result", result);
		renderJSON(map);
	}
}
