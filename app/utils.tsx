
export function formatIslamicDate(date: Date = new Date()): string {
    // Islamic month names in Arabic
    const islamicMonths = [
      'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban', 
      'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
    ];
  
    // Create a new date object with the provided date
    const gregorianDate = new Date(date);
    
    // Convert to Islamic calendar using Intl.DateTimeFormat
    const islamicDateFormatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    
    // Get formatted date parts
    const parts = islamicDateFormatter.formatToParts(gregorianDate);
    
    // Extract day, month, and year from the parts
    let day = '';
    let month = 0;
    let year = '';
    
    for (const part of parts) {
      if (part.type === 'day') {
        day = part.value;
      } else if (part.type === 'month') {
        month = parseInt(part.value, 10) - 1; // Convert to 0-based index
      } else if (part.type === 'year') {
        year = part.value;
      }
    }
    
    // Return the formatted Islamic date
    return `${day} ${islamicMonths[month]} ${year}`;
  }
  