export const ringClasses = (color: string) => {
  switch (color) {
    case "orange":
      return "ring-orange_1";
    case "red":
      return "ring-red_2";
    case "blue":
      return "ring-primary_1";
    case "green":
      return "ring-green_1";
    case "black":
      return "ring-gray_1";
    case "white":
      return "ring-background";
    default:
      return "ring-transparent";
  }
  };

export const bgClasses = (color: string) => {
  switch (color) {
    case "orange":
      return "bg-orange_1";
    case "red":
      return "bg-red_2";
    case "blue":
      return "bg-primary_1";
    case "green":
      return "bg-green_1";
    case "black":
      return "bg-gray_1";
    case "white":
      return "bg-background";
    default:
      return "bg-transparent";
  }
};