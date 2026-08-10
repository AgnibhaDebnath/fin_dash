export const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const formatedDate = dateObj.toLocaleString('en-US', { month: 'long', day: 'numeric', year: "2-digit" })
    return formatedDate;
}