import coffeeImage from 'images/content/coffee.png';
import cinnamonImg from 'images/content/cappuccino/cinnamon_&_cocoa.png';
import drizzledImg from 'images/content/cappuccino/drizzled_width_caramel.png';
import burstingImg from 'images/content/cappuccino/bursting_blueberry.png';
import dalgonaImg from 'images/content/cappuccino/dalgona_whipped_macha.png';

export interface ContentI {
    id: number;
    rating: number;
    image: string;
    name: string;
    cost: number;
}

export const cappuccino: ContentI[] = [
    {
        id: 0,
        rating: 4.5,
        image: cinnamonImg,
        cost: 99,
        name: 'Cinnamon &\n Cocoa',
    },
    {
        id: 1,
        rating: 4.9,
        image: drizzledImg,
        cost: 199,
        name: 'Drizzled width\n Caramel',
    },
    {
        id: 2,
        rating: 4.1,
        image: burstingImg,
        cost: 249,
        name: 'Bursting\n Blueberry',
    },
    {
        id: 3,
        rating: 4.3,
        image: dalgonaImg,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 4,
        rating: 4.4,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 5,
        rating: 4.7,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
];

export const latte: ContentI[] = [
    {
        id: 2,
        rating: 4.1,
        image: burstingImg,
        cost: 249,
        name: 'Bursting\n Blueberry',
    },
    {
        id: 3,
        rating: 4.3,
        image: dalgonaImg,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 4,
        rating: 4.4,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 5,
        rating: 4.7,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
];

export const americano: ContentI[] = [
    {
        id: 0,
        rating: 4.5,
        image: cinnamonImg,
        cost: 99,
        name: 'Cinnamon &\n Cocoa',
    },
    {
        id: 1,
        rating: 4.9,
        image: drizzledImg,
        cost: 199,
        name: 'Drizzled width\n Caramel',
    },
    {
        id: 4,
        rating: 4.4,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 5,
        rating: 4.7,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
];

export const espresso: ContentI[] = [
    {
        id: 0,
        rating: 4.5,
        image: cinnamonImg,
        cost: 99,
        name: 'Cinnamon &\n Cocoa',
    },
    {
        id: 1,
        rating: 4.9,
        image: drizzledImg,
        cost: 199,
        name: 'Drizzled width\n Caramel',
    },
    {
        id: 2,
        rating: 4.1,
        image: burstingImg,
        cost: 249,
        name: 'Bursting\n Blueberry',
    },
    {
        id: 3,
        rating: 4.3,
        image: dalgonaImg,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 4,
        rating: 4.4,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 5,
        rating: 4.7,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
];
export const flatWhite: ContentI[] = [
    {
        id: 0,
        rating: 4.5,
        image: cinnamonImg,
        cost: 99,
        name: 'Cinnamon &\n Cocoa',
    },
    {
        id: 1,
        rating: 4.9,
        image: drizzledImg,
        cost: 199,
        name: 'Drizzled width\n Caramel',
    },
    {
        id: 2,
        rating: 4.1,
        image: burstingImg,
        cost: 249,
        name: 'Bursting\n Blueberry',
    },
    {
        id: 3,
        rating: 4.3,
        image: dalgonaImg,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 4,
        rating: 4.4,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
    {
        id: 5,
        rating: 4.7,
        image: coffeeImage,
        cost: 299,
        name: 'Dalgona\n Whipped Macha',
    },
];
