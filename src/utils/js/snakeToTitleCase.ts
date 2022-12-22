export default function snakeToTitleCase(str: string): string {
  return str
    .split('_')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};