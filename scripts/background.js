"use strict";

var imgs_on = {
	16: "icons/icon-16-on.png",
	32: "icons/icon-32-on.png",
	48: "icons/icon-48-on.png",
	64: "icons/icon-64-on.png",
	96: "icons/icon-96-on.png",
	128: "icons/icon-128-on.png"
};
var imgs_off = {
	16: "icons/icon-16-off.png",
	32: "icons/icon-32-off.png",
	48: "icons/icon-48-off.png",
	64: "icons/icon-64-off.png",
	96: "icons/icon-96-off.png",
	128: "icons/icon-128-off.png"
};

var intervalSec = 60; // default

function onError(error) {
	console.error(`Colab Automatic Clicker: ${error}`);
}

function updateStatus(tabId, response) {
	browser.browserAction.setIcon({
		tabId: tabId,
		path: response.ok ? imgs_on : imgs_off
	});
}

function requestClicking(tab) {
	browser.tabs
		.sendMessage(tab.id, { "intervalSec": intervalSec })
		.then(response => updateStatus(tab.id, response))
		.catch(onError);
}

browser.browserAction
	.onClicked
	.addListener(tab => requestClicking(tab));
