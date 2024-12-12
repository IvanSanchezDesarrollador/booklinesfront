export function formatNameMonth(isoString: string): string {
    const date = new Date(isoString);
  
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convierte el formato 24 horas a 12 horas
    const formattedHours = String(hours).padStart(2, "0");
  
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  }