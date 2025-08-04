export const getFormattedDateTime = (date: Date) => {
  if (date.toString() === "Invalid Date") return "";
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

// const oneWeek = 1000 * 60 * 60 * 24 * 7;
// export const isDateTimeWithinLastWeek = (dateTime: Date) => {
//   const now = Date.now();
//   if (dateTime.getTime() > now) return false; // If datetime passed is in the future.
//   return now - dateTime.getTime() <= oneWeek;
// };
// NOTE: Problem with above approach is that it checks by exact 7 days' time, thus, suppose today's
// Monday 21:00, and the expense was made on last Monday, but it was earlier than 21:00, it wouldn't
// show up. Thus, following approach is better:

export const isDateTimeWithinLastWeek = (dateTime: Date) => {
  const today = new Date();
  const dateOneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return dateTime >= dateOneWeekAgo && dateTime <= today;
  // NOTE: Comparison operators don't require the Date object to be converted to Unix TimeStamp, but
  // for arithmetic operators, gotta convert them using .getTime()
};
