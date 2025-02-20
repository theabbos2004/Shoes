export const ringClasses = (color: string) => {
    switch (color) {
      case "orange":
        return "ring-orange_1";
      case "red":
        return "ring-red_1";
      case "blue":
        return "ring-primary_1";
      case "green":
        return "ring-green_1";
      case "black":
        return "ring-black_1";
      case "white":
        return "ring-white_1";
      default:
        return "";
    }
  };

export const bgClasses = (color: string) => {
  switch (color) {
    case "orange":
      return "bg-orange_1";
    case "red":
      return "bg-red_1";
    case "blue":
      return "bg-primary_1";
    case "green":
      return "bg-green_1";
    case "black":
      return "bg-black_1";
    case "white":
      return "bg-white_1";
    default:
      return "";
  }
};