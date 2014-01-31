function addClick() {
	var el;
    el = document.getElementById("deadlineset");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
};

function addItem() {    
	var et;
    et = document.getElementById("deadlineset");
    et.style.visibility = (et.style.visibility == "visible") ? "hidden" : "visible";
};

function onClickDoneToAdd() {    
    var deadline = document.getElementById("deadline").value;    
    var context = document.getElementById("new-todo").value;
    
    var req = new XMLHttpRequest();    
    
    req.open("POST", "/todo/addnew");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            location.href = "/application/index";
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
        
        if (responsecode == "true") {
            location.href = "/application/index";
        }
    }
    
    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("context=" + enc(context) + "&" +
                "deadline=" + enc(deadline));
    
    document.getElementById("deadlineset").style.visibility = "hidden";
}

function onClickNoDeadLineToAdd() {
	var deadline = "";    
    var context = document.getElementById("new-todo").value;
         
    var req = new XMLHttpRequest();    
    
    req.open("POST", "/todo/addnew");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            location.href = "/application/index";
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
        
        if (responsecode == "true") {
            location.href = "/application/index";
        }
    }
    
    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("context=" + enc(context) + "&" +
                "deadline=" + enc(deadline));
    
    document.getElementById("deadlineset").style.visibility = "hidden";
}

function onClickCancelAdding() {
    var el;
    el = document.getElementById("deadlineset");
    el.style.visibility = "hidden";
        
    var d = document.getElementById("header"); 
    d.innerHTML = "<input id=\"new-todo\" type=\"text\" name=\"context\" size=\"35\" placeholder=\"add new task here\" value=\"\" />";
}

function editItem(itemid) {
    var doc = document.getElementById(itemid.id);
    var node = doc.parentNode;
    
    var _id = itemid.id;
    var oldCreated = node.getElementsByClassName("created")[0].innerHTML;
    var oldDeadline = node.getElementsByClassName("deadline")[0].innerHTML;
    var oldContent = node.getElementsByClassName("content")[0].innerHTML;
        
    node.innerHTML = "<input type='checkbox' /><label class='toggle' ></label><div class='content' name='content' id='content'><form action=\"javascript: var _id = 'x" + _id + "'; onEditItem(_id);\"><header id='header'><input id='new-todo' class='edit-todo' type='text' name='context' size='35' value='" + oldContent +"' /></header></form></div><div class='created' id='created'>"+ oldCreated + "</div><div class='deadline' id='deadline'>" + oldDeadline + "</div></div>";
}

function onEditItem(id) { 
    var newContent = self.document.activeElement.parentElement.parentElement.parentElement.getElementsByClassName("edit-todo")[0].value;
    self.document.activeElement.parentElement.parentElement.parentElement.innerHTML = newContent;

    var req = new XMLHttpRequest();    
    
    req.open("POST", "/todo/edititem");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
        
    }
    
    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("context=" + enc(newContent) + "&" +
                "itemid=" + enc(id));    
}

function onDoneClick(_id) {
	var req = new XMLHttpRequest();
    
    req.open("POST", "/todo/ondone");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            location.href = "/application/index";
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
    }

    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("itemid=" + enc(_id.id));
}

$(function(){
	dateFormat: 'yyyy-MM-dd', 
	$('*[name=_date]').appendDtpicker({
		"closeOnSelected": true        
	});
});

function showAll() {
    document.getElementById("undonelist").style.display = "block";
    document.getElementById("donelist").style.display = "block";        
}

function showActive() {
    document.getElementById("undonelist").style.display = "block";
    document.getElementById("donelist").style.display = "none";                                                                            
}  

function showCompleted() {
    document.getElementById("donelist").style.display = "block";
    document.getElementById("undonelist").style.display = "none";                                                                            
}  

function clearTasks() {
    document.getElementById("donelist").style.display = "none"; 
    
    var req = new XMLHttpRequest();
    
    req.open("POST", "/todo/onclear");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
        
        if (responsecode == "Ok") {
            location.href = "/application/index";
        }
    }

    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("");
}

function enc(s) {
    return encodeURIComponent(s).replace(/%20/g, '+');
}

function logout() {
    var req = new XMLHttpRequest();
    req.open("POST", "/login/logout");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
                
        if (responsecode == "Ok") {
            location.href = "/application/index";
        }
    }
    
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("");
}