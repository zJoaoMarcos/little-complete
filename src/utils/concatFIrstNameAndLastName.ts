export const concatFirstNameAndLastName = (completeName: string) => {
  if (completeName === null || undefined) {
    completeName;
  }

  const spacedNames = completeName.trim().split(" ");
  const firstName = spacedNames[0]
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, function (letter) {
      return letter.toUpperCase();
    });

  const lastName = spacedNames[1]
    ? spacedNames[spacedNames.length - 1]
        .toLowerCase()
        .replace(/(?:^|\s)\w/g, function (letter) {
          return letter.toUpperCase();
        })
    : "";

  const displayName = `${firstName} ${lastName}`;
  return displayName;
};
