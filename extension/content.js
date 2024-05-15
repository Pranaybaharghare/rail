// Get the login credentials from browser storage
chrome.storage.local.get(['username', 'password']).then((result) => {
    const { username, password } = result;
  
    // Click the login button to open the login popup
    const waitForLoginButton = setInterval(() => {
      const loginButton = document.querySelector('a.search_btn.loginText');
      if (loginButton) {
        clearInterval(waitForLoginButton);
        loginButton.click();
  
        // Wait for the login form to be available after clicking the login button
        const waitForLoginForm = setInterval(() => {
          const loginForm = document.querySelector('form.ng-pristine');
          console.log(loginForm);
          if (loginForm) {
            clearInterval(waitForLoginForm);
  
            // Fill the login form
            let usernameInput = loginForm.querySelector('input[formcontrolname="userid"]');
            let passwordInput = loginForm.querySelector('input[formcontrolname="password"]');
            usernameInput.value = username;
            passwordInput.value = password;
  
            // Submit the login form
            const submitBtn = loginForm.querySelector('#pb_sign_in');
            submitBtn.click();
          }
        }, 100);
      }
    }, 100);
  });