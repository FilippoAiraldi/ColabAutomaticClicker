"use strict";

var intervalId = null;

function performClick() {
	document
		.querySelector('#top-toolbar > colab-connect-button')
		.shadowRoot
		.querySelector('#connect')
		.click();	
}

browser.runtime.onMessage.addListener(() => {
	if (intervalId === null) {
		performClick();
		intervalId = setInterval(performClick, 1000 * 60 * 1);
	} else {
		clearInterval(intervalId);
		intervalId = null;
	}
	return Promise.resolve(intervalId !== null);
});
