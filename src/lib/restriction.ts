import { toast } from "sonner";
import { itinerary } from "@/data/itinerary";

// Date to unlock features: 1 day before trip starts
export const UNLOCK_DATE = new Date(`${itinerary[0].date}T00:00:00+07:00`);
UNLOCK_DATE.setDate(UNLOCK_DATE.getDate() - 1);

export const isRestricted = (): boolean => {
  if (process.env.NODE_ENV === "development") return false;
  const now = new Date();
  return now < UNLOCK_DATE;
};

export const handleRestrictedAction = (actionName: string): boolean => {
  // if (isRestricted()) {
  // 	const unlockDate = UNLOCK_DATE.toLocaleDateString('vi-VN');
  // 	toast.error(`Tính năng "${actionName}" sẽ được mở vào ngày ${unlockDate}!`, {
  // 		description: 'Hãy quay lại sau nhé!',
  // 		duration: 3000,
  // 	});
  // 	return true; // Action was restricted
  // }
  return false; // Action allowed
};
