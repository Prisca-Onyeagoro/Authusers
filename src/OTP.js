export default function generateRandomFig() {
  const figures = [];

  for (let i = 0; i < 6; i++) {
    const randfig = Math.floor(Math.random() * 9) + 1;
    figures.push(randfig);
  }

  return figures;
}
