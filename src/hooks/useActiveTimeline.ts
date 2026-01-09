import { useMemo, useEffect, useState } from 'react';
import {
	itinerary,
	type DaySchedule,
	type TimelineItem,
} from '@/data/itinerary';

export interface ActiveTimelineState {
	activeDay: DaySchedule | null;
	activeDayIndex: number;
	activeItem: TimelineItem | null;
	activeItemIndex: number;
	upcomingItem: TimelineItem | null;
	upcomingItemIndex: number;
	minutesUntilNext: number | null;
	status: 'before-trip' | 'during-trip' | 'after-trip';
}

/**
 * Parse time string like "14:30" or "14:30 - 16:00" to Date object
 */
function parseTimeToDate(timeStr: string, dateStr: string): Date {
	// Extract start time from ranges like "14:30 - 16:00" or "20:30+"
	const startTime = timeStr.split('-')[0].replace('+', '').trim();
	const [hours, minutes] = startTime.split(':').map(Number);

	const date = new Date(dateStr);
	date.setHours(hours, minutes, 0, 0);
	return date;
}

/**
 * Parse end time from time string, returns null if no end time
 */
function parseEndTimeToDate(timeStr: string, dateStr: string): Date | null {
	if (!timeStr.includes('-')) {
		// Single time like "14:00" - assume 1 hour duration
		const [hours, minutes] = timeStr.replace('+', '').split(':').map(Number);
		const date = new Date(dateStr);
		date.setHours(hours + 1, minutes, 0, 0);
		return date;
	}

	const endTimeStr = timeStr.split('-')[1]?.replace('+', '').trim();
	if (!endTimeStr) return null;

	const [hours, minutes] = endTimeStr.split(':').map(Number);
	const date = new Date(dateStr);
	date.setHours(hours, minutes, 0, 0);
	return date;
}

export function useActiveTimeline(): ActiveTimelineState {
	const [now, setNow] = useState(() => new Date());

	// Update every minute
	useEffect(() => {
		const interval = setInterval(() => {
			setNow(new Date());
		}, 60000); // 1 minute

		return () => clearInterval(interval);
	}, []);

	return useMemo(() => {
		const tripStart = new Date(itinerary[0].date);
		tripStart.setHours(0, 0, 0, 0);

		const tripEnd = new Date(itinerary[itinerary.length - 1].date);
		tripEnd.setHours(23, 59, 59, 999);

		// Before trip
		if (now < tripStart) {
			return {
				activeDay: null,
				activeDayIndex: -1,
				activeItem: null,
				activeItemIndex: -1,
				upcomingItem: itinerary[0].timeline[0],
				upcomingItemIndex: 0,
				minutesUntilNext: null,
				status: 'before-trip',
			};
		}

		// After trip
		if (now > tripEnd) {
			const lastDay = itinerary[itinerary.length - 1];
			const lastItem = lastDay.timeline[lastDay.timeline.length - 1];
			return {
				activeDay: lastDay,
				activeDayIndex: itinerary.length - 1,
				activeItem: lastItem,
				activeItemIndex: lastDay.timeline.length - 1,
				upcomingItem: null,
				upcomingItemIndex: -1,
				minutesUntilNext: null,
				status: 'after-trip',
			};
		}

		// During trip - find active day
		const todayStr = now.toISOString().split('T')[0];
		const activeDayIndex = itinerary.findIndex((day) => day.date === todayStr);

		if (activeDayIndex === -1) {
			// No matching day found - edge case
			return {
				activeDay: null,
				activeDayIndex: -1,
				activeItem: null,
				activeItemIndex: -1,
				upcomingItem: null,
				upcomingItemIndex: -1,
				minutesUntilNext: null,
				status: 'during-trip',
			};
		}

		const activeDay = itinerary[activeDayIndex];
		let activeItem: TimelineItem | null = null;
		let activeItemIndex = -1;
		let upcomingItem: TimelineItem | null = null;
		let upcomingItemIndex = -1;
		let minutesUntilNext: number | null = null;

		// Find current/upcoming item in today's timeline
		for (let i = 0; i < activeDay.timeline.length; i++) {
			const item = activeDay.timeline[i];
			const startTime = parseTimeToDate(item.time, activeDay.date);
			const endTime = parseEndTimeToDate(item.time, activeDay.date);

			// Check if this is the current activity
			if (endTime && now >= startTime && now <= endTime) {
				activeItem = item;
				activeItemIndex = i;

				// Next item is upcoming
				if (i + 1 < activeDay.timeline.length) {
					upcomingItem = activeDay.timeline[i + 1];
					upcomingItemIndex = i + 1;
					const nextStart = parseTimeToDate(upcomingItem.time, activeDay.date);
					minutesUntilNext = Math.round(
						(nextStart.getTime() - now.getTime()) / 60000
					);
				}
				break;
			}

			// Check if this item is upcoming
			if (now < startTime) {
				upcomingItem = item;
				upcomingItemIndex = i;
				minutesUntilNext = Math.round(
					(startTime.getTime() - now.getTime()) / 60000
				);

				// Previous item might still be active if no explicit end time
				if (i > 0) {
					activeItem = activeDay.timeline[i - 1];
					activeItemIndex = i - 1;
				}
				break;
			}
		}

		// If no upcoming item found, we're past the last item
		if (!upcomingItem && !activeItem) {
			activeItem = activeDay.timeline[activeDay.timeline.length - 1];
			activeItemIndex = activeDay.timeline.length - 1;
		}

		return {
			activeDay,
			activeDayIndex,
			activeItem,
			activeItemIndex,
			upcomingItem,
			upcomingItemIndex,
			minutesUntilNext,
			status: 'during-trip',
		};
	}, [now]);
}
