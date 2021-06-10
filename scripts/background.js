"use strict";

var clickingOpts = {
	id: "clicking-browseraction",
	interval: 60 // seconds, default value
}

var icons = {
	on: {
		16: "icons/icon-16-on.png",
		32: "icons/icon-32-on.png",
		48: "icons/icon-48-on.png",
		64: "icons/icon-64-on.png",
		96: "icons/icon-96-on.png",
		128: "icons/icon-128-on.png"		
	},
	off: {
		16: "icons/icon-16-off.png",
		32: "icons/icon-32-off.png",
		48: "icons/icon-48-off.png",
		64: "icons/icon-64-off.png",
		96: "icons/icon-96-off.png",
		128: "icons/icon-128-off.png"
	}
};

function onError(error) {
	console.error(`Colab Automatic Clicker: ${error}`);
}

function updateStatus(tabId, response) {
	if (tabId !== undefined && response !== undefined) {
		browser.browserAction.setIcon({
			tabId: tabId,
			path: response.ok ? icons.on : icons.off
		});
	}
}

async function requestClicking(tab) {
	browser.tabs
		.sendMessage(tab.id, clickingOpts)
		.then(response => updateStatus(tab.id, response))
		.catch(onError);
}

browser.browserAction.onClicked.addListener(requestClicking);
