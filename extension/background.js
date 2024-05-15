// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('https://www.irctc.co.in/nget/train-search')) {
      const contentScriptInjected = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
      console.log('Content script injected:', contentScriptInjected);
    }
  });