export function removeHyphens(sentence: string | undefined) {
  if (sentence) return sentence.replace(/-/g, " ");
}
