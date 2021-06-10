"use strict";

var intervalId = null;
var objNotFound = obj => obj === undefined || obj === null;
var isClicking = () => !objNotFound(intervalId)
var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function performClickingOnceAsync() {    
    var connectBtn = document
 		?.querySelector('#top-toolbar > colab-connect-button')
 		?.shadowRoot
 		?.querySelector('#connect')
    if (objNotFound(connectBtn)) {
        return;
    }
    connectBtn.click();
    await sleep(500);
    var closeBtn = document?.querySelector('paper-icon-button[title=Close]');
    if (objNotFound(closeBtn)) {
        return;
    }
    closeBtn.click(); 
}

function commenceClicking(seconds) {
	if (seconds === undefined) {
		seconds = 60; // default
	}
	performClickingOnceAsync();
	intervalId = setInterval(performClickingOnceAsync, seconds * 1000);
}

function ceaseClicking() {
	clearInterval(intervalId);
	intervalId = null;
}

function manageRequest(message) {
	if (message.id === "clicking-browseraction") {
		isClicking() ? ceaseClicking() : commenceClicking(message.interval);
		return Promise.resolve({ ok: isClicking() });
	}
}

browser.runtime.onMessage.addListener(message => manageRequest(message));
