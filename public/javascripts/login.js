function action() {
    var req = new XMLHttpRequest();
    req.open("POST", "/todo/checklogin");
    
    req.onreadystatechange = function () {
        alert("logged");
    }
};

function login() {
	
	var req = new XMLHttpRequest();
    
	req.open("POST", "/login/dologin");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
    	if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            location.href="/application/index";
            return;
        }
        
        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;        
        if (responsecode == "true") {
        	// login succeed
        	location.href="/application/index";
        } else {
        	var ed;
            ed = document.getElementById("login_error");
            ed.style.visibility = (ed.style.visibility == "visible") ? "hidden" : "visible";
        }
    }
    
    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("login=" + enc(document.getElementById("login").value) + "&" +
    			"password=" + enc(document.getElementById("password").value));
}

//入力文字列を urlencode して返す
function enc(s) {
    return encodeURIComponent(s).replace(/%20/g, '+');
}

function retry() {
	var ed;
    ed = document.getElementById("login_error");
    ed.style.visibility = "hidden";    
}