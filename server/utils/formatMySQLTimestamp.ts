/**
 * @name dateToMySQLTimestamp
 * @desc This function will convert a JS Date object to a MySQL timestamp string.
 * @param date 
 * @returns A MySQL timestamp string in the format: YYYY-MM-DD HH:MM:SS
 */
export default function dateToMySQLTimestamp(date: Date): string {
    // MySQL timestamp has the format: YYYY-MM-DD HH:MM:SS
    // But JS dates have the format: YYYY-MM-DDTHH:MM:SSZ
    // This function will convert a Date object to that format.

    // This function will pad a number with leading zeros.
    const padStartFn = (num: number) => String(num).padStart(2, '0');

    // Return the formatted timestamp string like YYYY-MM-DD HH:MM:SS
    return `${padStartFn(date.getFullYear())}-${padStartFn(date.getMonth() + 1)}-${padStartFn(date.getDate())} ${padStartFn(date.getHours())}:${padStartFn(date.getMinutes())}:${padStartFn(date.getSeconds())}`;
}
