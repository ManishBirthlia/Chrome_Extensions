// async () => {
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//   console.log(response);
// })();