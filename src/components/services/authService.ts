// This is a mock implementation for demo purposes
// In a real app, this would communicate with your backend API

interface User {
    id: string;
    name: string;
    email: string;
  }
  
  interface AuthResponse {
    user: User;
    token: string;
  }
  
  // Simulated tokens expiration (5 minutes for demo purposes)
  const TOKEN_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  class AuthService {
    private tokenKey = 'auth_token';
    private userKey = 'auth_user';
    private tokenExpiryKey = 'auth_token_expiry';
  
    isAuthenticated(): boolean {
      const token = this.getToken();
      const tokenExpiry = localStorage.getItem(this.tokenExpiryKey);
      
      if (!token || !tokenExpiry) {
        return false;
      }
      
      // Check if token has expired
      if (Date.now() > parseInt(tokenExpiry)) {
        this.logout(); // Clear expired token
        return false;
      }
      
      return true;
    }
  
    async login(email: string, password: string): Promise<User> {
      // In a real app, this would call your backend API
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          // Simple validation for demo
          if (email && password) {
            const mockUser = {
              id: 'usr_' + Math.random().toString(36).substring(2, 9),
              name: email.split('@')[0],
              email
            };
            
            const response: AuthResponse = {
              user: mockUser,
              token: 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15)
            };
            
            this.setAuthData(response);
            resolve(mockUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000); // Simulate network delay
      });
    }
  
    async register(email: string, password: string, name: string): Promise<User> {
      // In a real app, this would call your backend API
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          // Simple validation for demo
          if (email && password && name) {
            const mockUser = {
              id: 'usr_' + Math.random().toString(36).substring(2, 9),
              name,
              email
            };
            
            const response: AuthResponse = {
              user: mockUser,
              token: 'mock_jwt_token_' + Math.random().toString(36).substring(2, 15)
            };
            
            this.setAuthData(response);
            resolve(mockUser);
          } else {
            reject(new Error('Invalid registration data'));
          }
        }, 1000); // Simulate network delay
      });
    }
  
    logout(): void {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.tokenExpiryKey);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  
    getUser(): User | null {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    }
  
    private setAuthData(response: AuthResponse): void {
      localStorage.setItem(this.tokenKey, response.token);
      localStorage.setItem(this.userKey, JSON.stringify(response.user));
      localStorage.setItem(this.tokenExpiryKey, (Date.now() + TOKEN_EXPIRY).toString());
    }
  
    // Check token expiration periodically
    setupTokenExpirationCheck(onExpired: () => void, checkInterval = 60000): NodeJS.Timeout {
      return setInterval(() => {
        const tokenExpiry = localStorage.getItem(this.tokenExpiryKey);
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
          this.logout();
          onExpired();
        }
      }, checkInterval);
    }
  }
  
  export default new AuthService();