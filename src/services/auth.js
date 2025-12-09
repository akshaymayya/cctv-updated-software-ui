// Simulated Authentication Service
// In a real app, this would be replaced by Firebase Auth or similar SDKs

export const authService = {
    // Simulate Google Sign-In Popup
    signInWithGoogle: () => {
        return new Promise((resolve) => {
            // 1. Open a popup (simulated visual feedback)
            const width = 500;
            const height = 600;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);

            const popup = window.open(
                'about:blank',
                'Google Sign In',
                `width=${width},height=${height},top=${top},left=${left}`
            );

            // Write some dummy content to the popup to make it look real-ish
            if (popup) {
                popup.document.write(`
          <html>
            <head>
              <title>Sign in with Google</title>
              <style>
                body { font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fff; color: #202124; }
                .loader { border: 3px solid #f3f3f3; border-top: 3px solid #4285f4; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin-bottom: 16px; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .google-logo { font-size: 24px; font-weight: 500; margin-bottom: 8px; }
              </style>
            </head>
            <body>
              <div class="google-logo"><span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span></div>
              <div class="loader"></div>
              <div>Connecting to secure server...</div>
              <script>
                setTimeout(() => {
                  window.close();
                }, 2000);
              </script>
            </body>
          </html>
        `);
            }

            // 2. Wait for "popup" to close (simulated delay)
            setTimeout(() => {
                resolve({
                    user: {
                        displayName: "Akshay (Demo)",
                        email: "akshay@example.com",
                        photoURL: "https://lh3.googleusercontent.com/a/default-user=s96-c",
                        provider: "google"
                    },
                    token: "mock-jwt-token-123456"
                });
            }, 2000);
        });
    },

    login: (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: {
                        displayName: "Admin User",
                        email: email,
                        provider: "email"
                    }
                });
            }, 1500);
        });
    }
};
