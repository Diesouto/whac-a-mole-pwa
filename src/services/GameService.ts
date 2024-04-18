class GameService {
  private static readonly difficultySettings: Record<
    string,
    { timeInterval: number; pointsIncrement: number }
  > = {
    bajo: { timeInterval: 1000, pointsIncrement: 10 },
    medio: { timeInterval: 750, pointsIncrement: 20 },
    alto: { timeInterval: 500, pointsIncrement: 30 },
  };

  static getTimeInterval(difficulty: string): number {
    const settings = this.difficultySettings[difficulty];
    return settings ? settings.timeInterval : 0;
  }

  static getPointsIncrement(difficulty: string): number {
    const settings = this.difficultySettings[difficulty];
    return settings ? settings.pointsIncrement : 0;
  }

  static generateRandomMolePosition(): number {
    return Math.floor(Math.random() * 9);
  }
}

export default GameService;
