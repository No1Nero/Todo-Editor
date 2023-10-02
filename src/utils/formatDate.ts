export const formatDate = (date: Date ) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    const FormattedDay = (day < 10) ? '0' + day : day;
    const FormattedMonth = (month < 10) ? '0' + month : month;
    const FormattedHours = (hours < 10) ? '0' + hours : hours;
    const FormattedMinutes = (minutes < 10) ? '0' + minutes : minutes;

    return FormattedDay + '.' + FormattedMonth + '.' + year + ' ' + FormattedHours + ':' + FormattedMinutes;
  };
