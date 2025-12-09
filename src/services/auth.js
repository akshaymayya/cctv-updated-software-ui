// Simulated Authentication Service
// In a real app, this would be replaced by Firebase Auth or similar SDKs

export const authService = {
  // Simulate Google Sign-In Popup
  signInWithGoogle: () => {
    return new Promise((resolve) => {
      console.log("Simulating Google Sign In...");

      // Simulate network delay without popup (better for demos)
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
      }, 1000);
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
