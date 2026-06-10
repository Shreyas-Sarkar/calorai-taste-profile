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
export type SwipeDirection = 'like' | 'dislike' | 'superlike' | 'unsure';

export interface SwipeResult {
  food: Food;
  direction: SwipeDirection;
}

export interface TastePersona {
  emoji: string;
  label: string;
}

export type RootStackParamList = {
  Intro: undefined;
  Swipe: undefined;
  Results: {
    results: SwipeResult[];
  };
  FAQ: undefined;
};

// Swipe state
export interface SwipeState {
  currentIndex: number;
  likedFoods: Food[];
  dislikedFoods: Food[];
}
