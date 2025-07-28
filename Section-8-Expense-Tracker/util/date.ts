export const getFormattedDateTime = (date: Date) => {
  const formattedDateTime = Intl.DateTimeFormat("en-US", {
    // dateStyle: "medium",
    // timeStyle: "short",
    // OR:
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
  //   console.log("🚀 ~ getFormattedDate ~ formattedDateTime:", formattedDateTime);
  return formattedDateTime;
};
