class GameService {
  private static molePosition: number = -1;
  private static currentPoints: number = 0;
  private static currentDifficulty: string = 'bajo';

  static getMolePosition(): number {
    return this.molePosition;
  }

  static setMolePosition(position: number): void {
    this.molePosition = position;
  }

  static hideMole(): void {
    this.molePosition = -1;
  }

  static generateRandomMolePosition(): number {
    return Math.floor(Math.random() * 9);
  }

  static getCurrentDifficulty(): string {
    return this.currentDifficulty;
  }

  static setCurrentDifficulty(difficulty: string): void {
    this.currentDifficulty = difficulty;
  }

  static getCurrentPoints(): number {
    return this.currentPoints;
  }

  static setCurrentPoints(points: number): void {
    this.currentPoints = points;
  }

  static addCurrentPoints(points: number): void {
    this.currentPoints += points;
  }

  static getTimeInterval(difficulty: string = this.currentDifficulty): number {
    switch (difficulty) {
      case 'bajo':
        return 1000;
      case 'medio':
        return 750;
      case 'alto':
        return 500;
      default:
        return 0;
    }
  }

  static getPointsIncrement(difficulty: string = this.currentDifficulty): number {
    switch (difficulty) {
      case 'bajo':
        return 10;
      case 'medio':
        return 20;
      case 'alto':
        return 30;
      default:
        return 0;
    }
  }

  static handleWhack(): void {
    this.hideMole();
    this.addCurrentPoints(this.getPointsIncrement());
  }

  static updateMolePosition(): void {
    const intervalId = setInterval(() => {
      const newPosition = this.generateRandomMolePosition();
      this.setMolePosition(newPosition);
    }, this.getTimeInterval());

    // Clean up interval
    clearInterval(intervalId);
  }
}

export default GameService;
