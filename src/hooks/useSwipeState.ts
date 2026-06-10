// useSwipeState — State management for swipe interactions
// Full implementation: Phase 4
// Types established here for Phase 1 data/navigation shell

import { Food } from '../types/index';

export interface SwipeStateHook {
  currentIndex: number;
  likedFoods: Food[];
  dislikedFoods: Food[];
  handleLike: () => void;
  handleDislike: () => void;
  progress: number; // 0.0 – 1.0
}

// Placeholder export — implementation added in Phase 4
export {};
