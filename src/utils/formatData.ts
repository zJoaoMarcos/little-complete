export const formatData = (data: string) => {
  const prepositions: string[] = ["a", "com", "de", "do", "em", "e"];
  const words: string[] = data.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (i === 0 || !prepositions.includes(words[i].toLocaleLowerCase())) {
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    } else {
      words[i] = words[i].toLowerCase();
    }
  }

  return words.join(" ");
};
