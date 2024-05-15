const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const fillLoginBtn = document.getElementById('fillLoginBtn');

// Save the login credentials to browser storage
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  chrome.storage.local.set({ username, password });
});

// Open the IRCTC website and initiate the login process
fillLoginBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://www.irctc.co.in/nget/train-search' });
});