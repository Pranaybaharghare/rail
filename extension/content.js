chrome.storage.local.get(['username', 'password'], (result) => {
  const { username, password } = result;

  const waitForLoginButton = setInterval(() => {
    const loginButton = document.querySelector('a.search_btn.loginText');
    if (loginButton) {
      clearInterval(waitForLoginButton);
      loginButton.click();

      const waitForLoginForm = new MutationObserver((mutations, observer) => {
        const loginForm = document.querySelector('form.novalidate');
        if (loginForm) {
          observer.disconnect(); // Stop observing

          let usernameInput = document.querySelector("#irctc-login").value;
          let passwordInput = document.querySelector("#irctc-password").value;

          if (usernameInput && passwordInput) {
            // Use value assignment and dispatch input event
            usernameInput.value = username;
            usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
            usernameInput.dispatchEvent(new Event('change', { bubbles: true }));

            passwordInput.value = password;
            passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
            passwordInput.dispatchEvent(new Event('change', { bubbles: true }));

            // Wait a little before clicking the submit button to ensure inputs are processed
            setTimeout(() => {
              const submitBtn = loginForm.querySelector('#pb_sign_in');
              if (submitBtn) {
                submitBtn.click();
              } else {
                console.error('Submit button not found');
              }
            }, 500);
          } else {
            console.error('Username or password input field not found');
          }
        }
      });

      waitForLoginForm.observe(document.body, { childList: true, subtree: true });
    }
  }, 100);
});
