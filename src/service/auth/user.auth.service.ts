export class UserAuthService {
    static setAuthToken(token: string) {
      localStorage.setItem('access_token', token)
    }
  
    static getAuthToken() {
      return localStorage.getItem('access_token')
    }
  
    static hasAuthToken() {
      return !!localStorage.getItem('access_token')
    }
  
    static removeAuthToken() {
      localStorage.removeItem('access_token')
    }
  }
  