const PLACEHOLDER_WORDS = [
  "Pigeon",
  "Hummingbird",
  "Flamingo",
  "Toucan",
  "Peacock",
  "Crow",
  "Cardinal",
  "Bald Eagle",
  "Snow Owl",
  "Dove",
  "Warbler",
  "Puffin",
  "Kestrel",
  "Pelican",
  "Parrot",
  "Swan",
  "Falcon",
  "Kingfisher",
  "Macaw",
  "Kiwi",
];

export const generatePlaceholder = () => {
  const wordIndex = Math.floor(Math.random() * PLACEHOLDER_WORDS.length + 1);
  return PLACEHOLDER_WORDS[wordIndex];
};
