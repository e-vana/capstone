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
