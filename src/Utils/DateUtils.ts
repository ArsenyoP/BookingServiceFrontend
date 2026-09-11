export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return ""; 
    }
  
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };