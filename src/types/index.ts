// Food data types matching foods.json structure

export interface Food {
  id: number;
  name: string;
  image: string;
  category: 'protein' | 'carb' | 'vegetable' | 'other';
  tags: string[];
}

export interface Cuisine {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export interface FoodsData {
  foods: Food[];
  cuisines: Cuisine[];
}

// Navigation types
export type SwipeAction = 'like' | 'dislike';

// Swipe state
export interface SwipeState {
  currentIndex: number;
  likedFoods: Food[];
  dislikedFoods: Food[];
}
