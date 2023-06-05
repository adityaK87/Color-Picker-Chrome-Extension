chrome.runtime.onInstalled.addListener(() => {
	console.log("I just Installed My Chrome Extension");
});

chrome.bookmarks.onCreated.addListener(() => {
	console.log("I just bookmarked this page");
});
