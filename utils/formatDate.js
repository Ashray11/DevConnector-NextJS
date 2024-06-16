function formatDate(date) {
    return new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(date));
}
  
export default formatDate;