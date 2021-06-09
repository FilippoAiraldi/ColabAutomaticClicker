"use strict";

var intervalId = null;
var isClicking = () => intervalId !== null;
var objNotFound = obj => obj === null || obj === undefined;
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

function commenceClicking(intervalSec) {
	if (intervalSec === undefined) {
		intervalSec = 60; // default
	}
	performClickingOnceAsync();
	intervalId = setInterval(performClickingOnceAsync, intervalSec * 1000);
}

function ceaseClicking() {
	clearInterval(intervalId);
	intervalId = null;
}

function manageRequest(message) {
	if (!isClicking()) {
		commenceClicking(message.intervalSec)
	} else {
		ceaseClicking()
	}
 	return Promise.resolve({ "ok": isClicking() });
}

browser.runtime.onMessage.addListener(message => manageRequest(message));
