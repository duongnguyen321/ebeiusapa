/**
 * Voucher System Types
 * Centralized type definitions for the voucher reward system
 */

export type VoucherCategory = 'service' | 'sensual' | 'fun' | 'special' | 'spicy';
export type SpicyLevel = 1 | 2 | 3;
export type TimeOfDay = 'morning' | 'afternoon' | 'night' | 'late_night';

/**
 * Central voucher definition with role-specific content
 * Used to define vouchers in one place, referenced by ID elsewhere
 */
export interface VoucherDefinition {
	id: string;
	
	// Role-specific content
	titleAnh: string;        // Title when Anh RECEIVES this voucher
	titleEm: string;         // Title when Em RECEIVES this voucher
	descriptionAnh: string;  // Description for Anh
	descriptionEm: string;   // Description for Em
	
	// Metadata
	icon: string;
	category: VoucherCategory;
	spicyLevel: SpicyLevel;
	duration?: string;       // e.g., "15 phút", "30 phút"
	allowedTimeOfDay?: TimeOfDay[];
}

/**
 * Runtime voucher state (for wallet, redeem status)
 */
export interface VoucherRewardState {
	id: string;
	isRedeemed: boolean;
	isUsed: boolean;
	unlockedAt?: number;     // timestamp when unlocked
	usedAt?: number;         // timestamp when used
	source?: 'quest' | 'passport' | 'easter_egg' | 'liquid_luck';
}

/**
 * Combined type for rendering a voucher card
 * Merges definition with state and role-specific content
 */
export interface VoucherDisplay {
	id: string;
	title: string;
	description: string;
	icon: string;
	category: VoucherCategory;
	spicyLevel: SpicyLevel;
	duration?: string;
	isRedeemed: boolean;
	isUsed: boolean;
	source?: string;
}
