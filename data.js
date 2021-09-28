/**
 * In a real app, this data would likely live in a database,
 * and be fetched from an API, either at runtime or at
 * compile-time.
 *
 * Keep in mind, this workshop is focused on CSS. In order
 * to make it easy to focus on the styling, we're cutting
 * some corners when it comes to our data management, and
 * our JavaScript in general. Please don't try to glean
 * any best-practices from stuff like this data file!
 */

export const SKULLS = [
    {
        name: 'Yellow',
        imageSrc: 'assets/yellow1.jpg',
        price: 5000,
    },
    {
        name: 'Big Square',
        imageSrc: 'assets/bigsquare1.jpg',
        price: 5000,
    },
    {
        name: 'Green',
        imageSrc: 'assets/green1.jpg',
        price: 5000,
    },
    {
        name: 'Heart',
        imageSrc: 'assets/heart1.jpg',
        price: 5000,
    },
    {
        name: 'Big Pink',
        imageSrc: 'assets/pink1.jpg',
        price: 5000,
    },
    {
        name: 'Purple',
        imageSrc: 'assets/purple1.jpg',
        price: 5000,
    },
    {
        name: 'Red',
        imageSrc: 'assets/red1.jpg',
        price: 5000,
    },
    {
        name: 'Red Bird',
        imageSrc: 'assets/redbird1.jpg',
        price: 5000,
    },
    {
        name: 'Red Black',
        imageSrc: 'assets/redblack1.jpg',
        price: 5000,
    },
    {
        name: 'Square',
        imageSrc: 'assets/square1.jpg',
        price: 5000,
    },
];

export const SHOES = [
    {
        slug: 'tech-challenge',
        name: 'NikeCourt Tech Challenge 20',
        imageSrc: '/assets/tech-challenge.jpg',
        price: 16500,
        salePrice: null,
        // 1 hour ago! 🔥
        releaseDate: Date.now() - 1000 * 60 * 60 * 1,
        numOfColors: 2,
    },
    {
        slug: 'metcon-5',
        name: 'Nike Metcon 5 AMP',
        imageSrc: '/assets/metcon-5.jpg',
        price: 16500,
        salePrice: null,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 2,
        numOfColors: 1,
    },
    {
        slug: 'phantom',
        name: 'Nike Phantom Vision',
        imageSrc: '/assets/phantom.jpg',
        price: 16500,
        salePrice: null,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 4,
        numOfColors: 4,
    },
    {
        slug: 'pegasus',
        name: 'Nike Air Zoom Pegasus',
        imageSrc: '/assets/pegasus.jpg',
        price: 16500,
        salePrice: null,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 16,
        numOfColors: 1,
    },
    {
        slug: 'joyride',
        name: 'Nike Joyride Dual Run',
        imageSrc: '/assets/joyride.jpg',
        price: 17000,
        salePrice: null,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 40,
        numOfColors: 2,
    },
    {
        slug: 'legend-academy',
        name: 'Nike Tiempo Legend 8',
        imageSrc: '/assets/legend-academy.jpg',
        price: 16500,
        salePrice: 12500,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 50,
        numOfColors: 8,
    },
    {
        slug: 'react-infinity',
        name: 'Nike React Infinity Pro',
        imageSrc: '/assets/react-infinity.jpg',
        price: 16000,
        salePrice: 14500,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 75,
        numOfColors: 1,
    },
    {
        slug: 'phantom-flyknit',
        name: 'Nike React Phantom Run Flyknit 2',
        imageSrc: '/assets/phantom-flyknit.jpg',
        price: 18500,
        salePrice: 16000,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 100,
        numOfColors: 4,
    },
    {
        slug: 'lebron',
        name: 'LeBron 17',
        imageSrc: '/assets/lebron.jpg',
        price: 26000,
        salePrice: null,
        releaseDate: Date.now() - 1000 * 60 * 60 * 24 * 120,
        numOfColors: 1,
    },
];
