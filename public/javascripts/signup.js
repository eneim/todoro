var oneTimeMsgClikced = false;
var uNameIsDone = false;
var eMailisDone = false;

function onCheckInputUser() {
    var uName = document.getElementById("u_name").value;
    var req = new XMLHttpRequest();

    req.open("POST", "/signup/checkusername");
    req.onreadystatechange = function () {
        // readyState == 4: 修了
        if (req.readyState != 4) {
            return;
        }
        // status == 200: 成功
        if (req.status != 200) {
            // 成功しなかった．失敗であることを表示して抜ける．
            location.href = "/signup/index";
            return;
        }

        var body = req.responseText;
        var data = eval("(" + body + ")");
        // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
        var responsecode = data.result;
        if (responsecode == "zero") {
            error.innerHTML = "Username must be from 5 to 15 characters length.";
            error.style.color = "Red";
            uNameIsDone = false;
        } else if (responsecode == "false") {
            error.innerHTML = "Username is in used.";
            error.style.color = "Red";            
            uNameIsDone = false;
        } else if (responsecode == "Ok") {
            error.innerHTML = "Username is valid and ready to use";
            error.style.color = "brown";
            uNameIsDone = true;
        }
    }

    // Content-Type の指定
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // <input id="f"> に入力された文字列をエンコードして送信        
    req.send("user_name=" + enc(document.getElementById("u_name").value));
}

function onCheckInputEmail() {
    var eMail = document.getElementById("e_mail").value;
    var req = new XMLHttpRequest();

    if (uNameIsDone == true) {
        req.open("POST", "/signup/checkemail");
        req.onreadystatechange = function () {
            // readyState == 4: 修了
            if (req.readyState != 4) {
                return;
            }
            // status == 200: 成功
            if (req.status != 200) {
                // 成功しなかった．失敗であることを表示して抜ける．
                location.href = "/signup/index";
                return;
            }

            var body = req.responseText;
            var data = eval("(" + body + ")");
            // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
            var responsecode = data.result;
            if (responsecode == "invalid") {
                error.innerHTML = "Your input email is incorrect.";
                error.style.color = "Red";
                oneTimeMsgClikced = false;
                eMailisDone = false;
            } else if (responsecode == "false") {
                error.innerHTML = "Your input email has been used.";
                error.style.color = "Red";
                oneTimeMsgClikced = false;
                eMailisDone = false;
            } else if (responsecode == "Ok") {
                eMailisDone = true;
            }
        }

        // Content-Type の指定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // <input id="f"> に入力された文字列をエンコードして送信        
        req.send("email=" + enc(document.getElementById("e_mail").value));
    }
}

function onSignup() {
    if (uNameIsDone == true && eMailisDone == true) {
        oneTimeMsgClikced = true;
    } else {
        oneTimeMsgClikced = false;
    }

    if (oneTimeMsgClikced == false) {
        error.innerHTML = "Some errors occur. Please check!";
        error.style.color = "Red";
    } else {
        var req = new XMLHttpRequest();

        req.open("POST", "/signup/dosignup");
        req.onreadystatechange = function () {
            // readyState == 4: 修了
            if (req.readyState != 4) {
                return;
            }
            // status == 200: 成功
            if (req.status != 200) {
                // 成功しなかった．失敗であることを表示して抜ける．
                location.href = "/signup/index";
                return;
            }

            var body = req.responseText;
            var data = eval("(" + body + ")");
            // 入力に利用したインプットボックスの値を，サーバから戻ってきた値で書き換える
            var responsecode = data.result;
            if (responsecode == "done") {
                // do somthing
                location.href = "/todo/index";
            } else if (responsecode == "false") {
                error.innerHTML = "Signup Error! Please try again later.";
                error.style.color = "Red";
                oneTimeMsgClikced = false;
            }
        }

        // Content-Type の指定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // <input id="f"> に入力された文字列をエンコードして送信        
        req.send("user_name=" + enc(document.getElementById("u_name").value) + "&" +
            "email=" + enc(document.getElementById("e_mail").value) + "&" +
            "password=" + enc(document.getElementById("p_word").value));
    }
}

function enc(s) {
    return encodeURIComponent(s).replace(/%20/g, '+');
}