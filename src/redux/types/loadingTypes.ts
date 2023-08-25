export type LoadingKeys = 'user' | 'product' | 'category';

export type LoadingState = Readonly<{
    [K in LoadingKeys]: boolean;
}>;
