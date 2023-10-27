export interface ProductStateI {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    price?: number;
    sellingPrice: number;
    img: string;
    rating: number;
    inCart?: boolean;
    favorite?: boolean;
}
