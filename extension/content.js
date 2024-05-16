// Get the login credentials from browser storage
chrome.storage.local.get(['username', 'password'], (result) => {
  const { username, password } = result;

  // Function to find the login button and click it
  function findAndClickLoginButton() {
    const loginButton = document.querySelector('a.search_btn.loginText');
    if (loginButton) {
      loginButton.click();

      // After clicking the login button, wait for the login form to be available
      const waitForLoginForm = new Promise((resolve) => {
        const observer = new MutationObserver(() => {
          const loginForm = document.querySelector('form.novalidate');
          if (loginForm) {
            observer.disconnect(); // Stop observing once the login form is found
            resolve(loginForm); // Resolve the promise with the login form
          }
        });

        observer.observe(document.body, { childList: true, subtree: true }); // Start observing the entire body
      });

      return waitForLoginForm.then((loginForm) => {
        // Fill the login form
        let usernameInput = loginForm.querySelector('input[name="userName"]');
        let passwordInput = loginForm.querySelector('input[name="password"]');
        usernameInput.value = username;
        passwordInput.value = password;

        // Submit the login form
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.click();
      });
    }
  }

  // Call the function to start the login process
  findAndClickLoginButton().catch(console.error);
});
