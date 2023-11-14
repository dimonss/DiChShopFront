export type LoadingKeys = 'user' | 'product' | 'category' | 'notification';

export type LoadingState = Readonly<{
    [K in LoadingKeys]: boolean;
}>;
