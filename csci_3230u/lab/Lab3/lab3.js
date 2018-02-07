var chatbox, chat, chatMsgs, chatInputBox;
var chatVisibility = false;
var emptySpace = new RegExp("[\\s]");
var msg;

window.onload = function () {
	chatbox = document.getElementById('chatbox');
	chatMsgs = document.getElementById('chatMsgs');
	chatInputBox = document.getElementById('chatInputBox');
	chat = document.getElementById('chat');

	//	chatMsg = chatbox.childNodes[0];
	chat.onclick = toggleChat;
}

function toggleChat() {
	if (chatVisibility) {
		chatbox.style.visibility = "hidden";
	} else {
		chatbox.style.visibility = "visible";
		chatInputBox.focus();
		chatInputBox.select();
	}

	chatVisibility = !chatVisibility;
}


function appendMessage(msg) {
	var newMsg = document.createElement('div');
	newMsg.appendChild(document.createTextNode(msg));
	chatMsgs.append(newMsg);
}


function enterMsg(e) {
	if (e.keyCode === 13) {
		msg = chatInputBox.value;

		chatInputBox.value = "";

		appendMessage("You: " + msg);
		chatMsgs.scrollTop = chatMsgs.scrollHeight;
	}
}
