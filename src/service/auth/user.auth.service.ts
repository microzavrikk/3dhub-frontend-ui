export class UserAuthService {
    static setAuthToken(token: string) {
      console.log("set token", token);
      localStorage.setItem('token', token)
    }
  
    static getAuthToken(): string | null {
      return localStorage.getItem('token')
    }
  
    static isAuthenticated(): boolean {
      return !!this.getAuthToken()
    }
  
    static removeAuthToken() {
      localStorage.removeItem('token')
    }

    static getUser() {
      return localStorage.getItem('user')
    }

    static setUser(user: any) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    static logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
  