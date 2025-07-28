type Trait = {
  trait: string;
  description: string;
};
type Traits = Trait[];

type Favorite = {
  category: string;
  item: string;
};
type Favorites = Favorite[];

export type UserProfile = {
  uid: string;
  name: string;
  bio?: string;
  interests?: string[];
  traits?: Traits;
  favorites?: Favorites;
  lookingFor?: string;
  conversationStarters?: string[];
  showInterests?: boolean;
  showTraits?: boolean;
  showFavorites?: boolean;
  showLookingFor?: boolean;
  showConversationStarters?: boolean;
};

export type FormUserProfile = Omit<
  UserProfile,
  "interests" | "conversationStarters"
> & {
  interests?: { value: string }[];
  conversationStarters?: { value: string }[];
};

export type BasicUserProfile = {
  uid: string;
  name: string;
  interests?: string[];
};
