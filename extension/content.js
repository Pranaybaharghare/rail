chrome.storage.local.get(['username', 'password'], (result) => {
  const { username, password } = result;
  
  const waitForLoginButton = setInterval(() => {
      const loginButton = document.querySelector('a.search_btn.loginText');
      if (loginButton) {
          clearInterval(waitForLoginButton);
          loginButton.click();

          const waitForLoginForm = setInterval(() => {
              const loginForm = document.querySelector('form.novalidate');
              if (loginForm) {
                  clearInterval(waitForLoginForm);

                  try {
                      let usernameInput = loginForm.querySelector('input[formcontrolname="userid"]');
                      let passwordInput = loginForm.querySelector('input[formcontrolname="password"]');
                      
                      if (usernameInput && passwordInput) {
                          usernameInput.value = "hello";
                          passwordInput.value = "coder";

                          const submitBtn = loginForm.querySelector('#pb_sign_in');
                          submitBtn.click();
                      } else {
                          console.error('Username or password input field not found');
                      }
                  } catch (error) {
                      console.error('Error filling in login form:', error);
                  }
              }
          }, 100);
      }
  }, 100);
});
