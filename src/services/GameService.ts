class GameService {
    static play(difficulty: string): number {
      let points = 0;
      // Lógica para calcular los puntos según la dificultad
      switch (difficulty) {
        case 'bajo':
          points = 1;
          break;
        case 'medio':
          points = 2;
          break;
        case 'alto':
          points = 3;
          break;
        default:
          points = 1;
      }
      return points;
    }
  }
  
  export default GameService;  
