/**
 * Converts a JS Date to a human readable string in the format "YY-MM-DD HH:MM AM/PM"
 * @param date 
 * @returns string in the format "YY-MM-DD HH:MM AM/PM"
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);

  // Determine AM/PM and format hours accordingly
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  // Create formatted date string in "YY-MM-DD HH:MM AM/PM" format
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}${period}`;

  return formattedDate;
};


/**
 * Converts a JS Date to a MySQL timestamp string in the format "YYYY-MM-DD HH:MM:SS"
 * @param date 
 * @returns string in the format "YYYY-MM-DD HH:MM:SS"
 */
export const formatSQLDate = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

/**
 * Convert a MySQL timestamp to a JS Date object
 * @param timestamp string in the format "YYYY-MM-DD HH:MM:SS"
 * @returns Date object
 */
export const timestampToDate = (timestamp: string) => {
  // MySQL timestamps have the format "YYYY-MM-DD HH:MM:SS"
  // Split the timestamp into date and time components
  const [date, time] = timestamp.split(" ");

  // Split the date into year, month, and day components
  const [year, month, day] = date.split("-");
  // Split the time into hour, minute, and second components
  const [hour, minute, second] = time.split(":");

  // Create a new Date object with the components
  return new Date(
    parseInt(year),
    parseInt(month) - 1, // Months are zero-based so January is 0 and December is 11
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  );
}
