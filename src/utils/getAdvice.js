export function getAdvice(temp) {
  if (temp <= 0) return "🧥 Grosse doudoune";
  if (temp <= 8) return "🧥 Manteau chaud";
  if (temp <= 15) return "🧥 Veste ou pull";
  if (temp <= 22) return "👕 Veste légère";
  return "👕 T-shirt suffisant";
}