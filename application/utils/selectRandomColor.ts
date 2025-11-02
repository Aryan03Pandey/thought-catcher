export const lightColors = [
  { name: "Light Coral", hex: "#F08080" },
  { name: "Peach Puff", hex: "#FFDAB9" },
  { name: "Misty Rose", hex: "#FFE4E1" },
  { name: "Pale Goldenrod", hex: "#EEE8AA" },
  { name: "Light Yellow", hex: "#FFFFE0" },
  { name: "Lemon Chiffon", hex: "#FFFACD" },
  { name: "Mint Cream", hex: "#F5FFFA" },
  { name: "Honeydew", hex: "#F0FFF0" },
  { name: "Light Cyan", hex: "#E0FFFF" },
  { name: "Powder Blue", hex: "#B0E0E6" },
  { name: "Pale Turquoise", hex: "#AFEEEE" },
  { name: "Light Sky Blue", hex: "#87CEFA" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Thistle", hex: "#D8BFD8" },
  { name: "Old Lace", hex: "#FDF5E6" }
];

export const selectRandomColor = () => {
  const index = Math.floor(Math.random() * lightColors.length)
  return lightColors[index].hex;
}