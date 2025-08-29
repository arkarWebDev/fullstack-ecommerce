import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId("68add60b0013521e949e5f46");

export const products = [
  {
    name: "Midnight Vibe Black Tee",
    description:
      "A sleek oversized black t-shirt made for comfort and street style. Perfect for casual wear or layering.",
    category: "t-shirt",
    colors: ["Black", "Charcoal", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    price: 70,
    images: [
      {
        url: "https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg",
        public_alt: "Black T-Shirt Front",
      },
      {
        url: "http://placehold.co/300x300/FF5733/FFFFFF/png",
        public_alt: "Black T-Shirt Alt 1",
      },
      {
        url: "http://placehold.co/300x300/33FF57/FFFFFF/png",
        public_alt: "Black T-Shirt Alt 2",
      },
      {
        url: "http://placehold.co/300x300/3357FF/FFFFFF/png",
        public_alt: "Black T-Shirt Alt 3",
      },
    ],
    is_new_arrival: true,
    is_feature: false,
    instock_count: 60,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Fresh Breeze White Tee",
    description:
      "A lightweight white t-shirt that brings a fresh and clean look. Designed for everyday wear.",
    category: "t-shirt",
    colors: ["White", "Cream", "Beige"],
    sizes: ["M", "L", "XL"],
    price: 78,
    images: [
      {
        url: "https://nobero.com/cdn/shop/files/white_855177b5-5621-4a4b-a0d1-9060b89a6a69.jpg",
        public_alt: "White T-Shirt Front",
      },
      {
        url: "http://placehold.co/300x300/FF33A1/FFFFFF/png",
        public_alt: "White T-Shirt Alt 1",
      },
      {
        url: "http://placehold.co/300x300/FFD433/FFFFFF/png",
        public_alt: "White T-Shirt Alt 2",
      },
      {
        url: "http://placehold.co/300x300/33FFF6/FFFFFF/png",
        public_alt: "White T-Shirt Alt 3",
      },
    ],
    is_new_arrival: true,
    is_feature: false,
    instock_count: 40,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Evergreen Comfort Hoodie",
    description:
      "A soft green hoodie perfect for both style and warmth. A go-to for cooler days.",
    category: "hoodie",
    colors: ["Green", "Olive", "Dark Green"],
    sizes: ["S", "M", "L"],
    price: 28,
    images: [
      {
        url: "https://nobero.com/cdn/shop/files/222C021C-8EFF-4A86-A782-A25876663738.jpg",
        public_alt: "Green Hoodie Front",
      },
      {
        url: "http://placehold.co/300x300/8D33FF/FFFFFF/png",
        public_alt: "Green Hoodie Alt 1",
      },
      {
        url: "http://placehold.co/300x300/33FFD7/FFFFFF/png",
        public_alt: "Green Hoodie Alt 2",
      },
      {
        url: "http://placehold.co/300x300/FF5733/FFFFFF/png",
        public_alt: "Green Hoodie Alt 3",
      },
    ],
    is_new_arrival: false,
    is_feature: true,
    instock_count: 40,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Urban Edge Black Hoodie",
    description:
      "A dark black hoodie with a bold edge, blending comfort and modern streetwear.",
    category: "hoodie",
    colors: ["Black", "Navy", "Dark Grey"],
    sizes: ["M", "L", "XL"],
    price: 60,
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/2987/0758/products/Lens_Hoodie-Hoodie-LDM201023-460201-Dark_Navy_White-2_07adae82-f321-4c65-a1bd-8038bdf3e8e4.jpg",
        public_alt: "Black Hoodie Front",
      },
      {
        url: "http://placehold.co/300x300/FF8C33/FFFFFF/png",
        public_alt: "Black Hoodie Alt 1",
      },
      {
        url: "http://placehold.co/300x300/33FF8C/FFFFFF/png",
        public_alt: "Black Hoodie Alt 2",
      },
      {
        url: "http://placehold.co/300x300/338CFF/FFFFFF/png",
        public_alt: "Black Hoodie Alt 3",
      },
    ],
    is_new_arrival: false,
    is_feature: true,
    instock_count: 30,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Cloudstep White Adidas Shoes",
    description:
      "Classic Adidas sneakers in white. Lightweight, durable, and stylish for any occasion.",
    category: "shoe",
    colors: ["White", "Grey", "Silver"],
    sizes: ["40", "41", "42", "43", "44"],
    price: 108,
    images: [
      {
        url: "https://rukminim2.flixcart.com/image/704/844/xif0q/shoe/q/s/n/-original-imah25hq9y8t3ukf.jpeg",
        public_alt: "White Adidas Shoe Front",
      },
      {
        url: "http://placehold.co/300x300/FF3333/FFFFFF/png",
        public_alt: "White Adidas Shoe Alt 1",
      },
      {
        url: "http://placehold.co/300x300/33FF33/FFFFFF/png",
        public_alt: "White Adidas Shoe Alt 2",
      },
      {
        url: "http://placehold.co/300x300/3333FF/FFFFFF/png",
        public_alt: "White Adidas Shoe Alt 3",
      },
    ],
    is_new_arrival: false,
    is_feature: true,
    instock_count: 10,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Denim Drift Jeans",
    description:
      "Classic blue denim jeans that combine durability with style. Perfect for casual and semi-formal outfits.",
    category: "jeans",
    colors: ["Blue", "Light Blue", "Dark Blue"],
    sizes: ["30", "32", "34", "36"],
    price: 70,
    images: [
      {
        url: "https://images.napali.app/global/element-products/all/default/xlarge/eljdp00106_element,f_bnt0_frt1.jpg",
        public_alt: "Blue Jeans Front",
      },
      {
        url: "http://placehold.co/300x300/FFAA33/FFFFFF/png",
        public_alt: "Jeans Alt 1",
      },
      {
        url: "http://placehold.co/300x300/33AAFF/FFFFFF/png",
        public_alt: "Jeans Alt 2",
      },
      {
        url: "http://placehold.co/300x300/AA33FF/FFFFFF/png",
        public_alt: "Jeans Alt 3",
      },
    ],
    is_new_arrival: true,
    is_feature: false,
    instock_count: 20,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "StreetFlex Black Shorts",
    description:
      "Stylish black shorts built for comfort and flexibility. Ideal for workouts or casual summer days.",
    category: "short",
    colors: ["Black", "Grey", "Dark Blue"],
    sizes: ["S", "M", "L", "XL"],
    price: 38,
    images: [
      {
        url: "https://www.shopcoveusa.com/cdn/shop/files/BLACK_FRONT.png",
        public_alt: "Black Shorts Front",
      },
      {
        url: "http://placehold.co/300x300/AAFF33/FFFFFF/png",
        public_alt: "Black Shorts Alt 1",
      },
      {
        url: "http://placehold.co/300x300/FF33AA/FFFFFF/png",
        public_alt: "Black Shorts Alt 2",
      },
      {
        url: "http://placehold.co/300x300/33FFAA/FFFFFF/png",
        public_alt: "Black Shorts Alt 3",
      },
    ],
    is_new_arrival: true,
    is_feature: false,
    instock_count: 20,
    rating_count: Math.floor(Math.random() * 100),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
