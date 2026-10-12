import { CloudRain, CloudSun, Sun, Cloud } from "lucide-react";

interface WeatherIconProps {
  icon: string;
  className?: string;
}

const WeatherIcon = ({ icon, className = "" }: WeatherIconProps) => {
  // Map icon identifiers to Lucide components
  switch (icon.toLowerCase()) {
    case "rain":
    case "🌧️":
      return <CloudRain className={className} />;
    case "cloud-sun":
    case "⛅":
    case "🌤️":
      return <CloudSun className={className} />;
    case "sun":
    case "☀️":
      return <Sun className={className} />;
    case "cloud":
    default:
      return <Cloud className={className} />;
  }
};

export default WeatherIcon;
