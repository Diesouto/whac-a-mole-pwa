class GameService {
  static generateRandomMolePosition(): number {
    return Math.floor(Math.random() * 9);
  }

  static getTimeInterval(difficulty: string): number {
    switch (difficulty) {
      case "bajo":
        return 1000;
      case "medio":
        return 750;
      case "alto":
        return 500;
      default:
        return 0;
    }
  }

  static getPointsIncrement(difficulty: string): number {
    switch (difficulty) {
      case "bajo":
        return 10;
      case "medio":
        return 20;
      case "alto":
        return 30;
      default:
        return 0;
    }
  }
}

export default GameService;
