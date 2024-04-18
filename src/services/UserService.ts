class UserService {
  static setUser(username: string): void {
    localStorage.setItem("username", username);
  }

  static getUser(): string | null {
    return localStorage.getItem("username");
  }

  static setPoints(points: number): void {
    localStorage.setItem("points", points.toString());
  }

  static getPoints(): number {
    const pointsStr = localStorage.getItem("points");
    return pointsStr ? parseInt(pointsStr, 10) : 0;
  }

  static logOut(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("points");
  }
}

export default UserService;
