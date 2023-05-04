export const formatData = (data: string) => {
  if (data === null || undefined) {
    return null;
  }

  const words = data.toLocaleLowerCase().trim().split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const updatedData = capitalizedWords.join(" ");

  return updatedData;
};
