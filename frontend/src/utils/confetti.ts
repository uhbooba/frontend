import confetti from 'canvas-confetti';

export const runConfetti = () => {
  const defaults = { startVelocity: 40, spread: 80, ticks: 80, zIndex: 0 };

  const particleCount = 100;

  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { y: 0.8 },
    }),
  );
};
