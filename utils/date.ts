export default function toDateOrTimeString(
  inputDate: Date | string | number,
): string {
  const date = new Date(inputDate);
  if (date.toDateString() === new Date().toDateString()) {
    return date.toLocaleTimeString([], { timeStyle: "short" });
  } else {
    return date.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
