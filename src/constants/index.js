export const availableColors = ['Black', 'White', 'Blue', 'Red'];
export const availableSizes = ['Small', 'Medium', 'Large', 'X-Large'];
export const rating = Math.round(Math.random() * 5 + 2) / 2;
export const persone = Math.round(Math.random() * 100);
export const review = [
    {
        id: 1,
        name: "Samantha D.",
        text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to t-shirt.",
        date: "August 14, 2023",
        rating: 5,
    },
    {
        id: 2,
        name: "Ethan R.",
        text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect.",
        date: "August 16, 2023",
        rating: 4.5,
    },
    {
        id: 3,
        name: "Liam K.",
        text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill.",
        date: "August 18, 2023",
        rating: 5,
    },
    {
        id: 4,
        name: "Alex M.",
        text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch.",
        date: "August 15, 2023",
        rating: 4,
    },
    {
        id: 5,
        name: "Olivia P.",
        text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear.",
        date: "August 17, 2023",
        rating: 5,
    },
    {
        id: 6,
        name: "Ava H.",
        text: "I'm not just wearing a t-shirt. I'm wearing a piece of design philosophy. The intricate details and layout make this a conversation starter.",
        date: "August 19, 2023",
        rating: 4.5,
    },
]
export const colors = [
    { text: 'green', color: '67AE6E' },
    { text: 'red', color: 'C5172E' },
    { text: 'yellow', color: 'FCF259' },
    { text: 'orange', color: 'FE7743' },
    { text: 'blue', color: '3A59D1' },
    { text: 'blue', color: '60B5FF' },
    { text: 'purple', color: '4F1C51' },
    { text: 'pink', color: 'FFB8E0' },
    { text: 'white', color: 'fff' },
    { text: 'black', color: '000' },
];

export const catagoris = [
    { label: "T-Shirt", id: 1 },
    { label: "Shorts", id: 1 },
    { label: "Shirts", id: 1 },
    { label: "Hoodie", id: 1 },
    { label: "Shoes", id: 4 },
    { label: "Electronics", id: 2 },
    { label: "Furniture", id: 3 },
    { label: "Miscellaneous", id: 5 },
]

export const orders = [
    {
        id: 1,
        image: 'https://inspireonline.in/cdn/shop/files/iPhone_16_Teal_PDP_Image_Position_1__en-IN_6aed3712-113a-4579-8a71-41c02aa0003c.jpg?v=1727247732&width=823',
        title: 'iPhone 16',
        price: 79999,
        description: '6.1-inch Super Retina XDR OLED, 2556 X 1179 pixels, 460 ppi, HDR10, Dolby Vision, 2000 nits peak brightness.Apple A18 chip with a 30% performance boost over its predecessor.Rear: 48MP Fusion main sensor with 2x optical-quality zoom, 12MP ultrawide lens Front: 12MP TrueDepth camera'
    },
    {
        id: 2,
        image: 'https://images-cdn.ubuy.co.in/670156d535252b53e93ad3c3-microsoft-surface-laptop-2024-windows.jpg',
        title: 'laptop',
        price: 45999,
        description: 'The Premium Laptop is designed for professionals, students, and tech enthusiasts who need a powerful yet portable device for work, entertainment, and everything in between. With cutting-edge performance, a sleek design, and long-lasting battery life, this laptop is engineered to keep up with your fast-paced lifestyle.'
    },
    {
        id: 3,
        image: 'https://3.imimg.com/data3/DS/MX/MY-7352474/printed-t-shirts-500x500.jpg',
        title: 'T-shirts',
        price: 769,
        description: 'This classic Men s Cotton T- shirt is designed for everyday comfort and style.Whether you re lounging at home or out with friends, this versatile T-shirt is a must-have in your wardrobe. Crafted from premium cotton, it offers a soft, breathable feel and a timeless fit that suits any occasion.'
    },
]