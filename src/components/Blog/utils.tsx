const dateMapper = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }
  
  function dateFormatter(date: string) {
    const [year, month, day] = date.split('/');
    return `${dateMapper[month]} ${day}, ${year}`;
  }

export default dateFormatter;