import { CloudRain, CloudSun, Sun, Cloud } from "lucide-react";

interface WeatherIconProps {
  icon: string;
  className?: string;
}

const WeatherIcon = ({ icon, className = "" }: WeatherIconProps) => {
  // Map emoji icons to Lucide components
  switch (icon) {
    case "🌧️":
      return <CloudRain className={className} />;
    case "⛅":
      return <CloudSun className={className} />;
    case "☀️":
      return <Sun className={className} />;
    case "🌤️":
      return <CloudSun className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

export default WeatherIcon;
