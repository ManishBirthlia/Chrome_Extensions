const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
export default tab;
