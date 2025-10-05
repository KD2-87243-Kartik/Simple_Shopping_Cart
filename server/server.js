const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; 

// Middleware
app.use(cors()); 
app.use(express.json());
const rawProducts = [
      // Vegetables
      {
        id: 1,
        name: "Potato 500g",
        price: 25,
        offerPrice: 20,
        category: "Vegetables",
        description: [
          "Fresh and organic",
          "Rich in carbohydrates",
          "Ideal for curries and fries",
        ],
        imageKey: "potato_image_1",
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true,
      },
      {
        id: 2,
        name: "Tomato 1 kg",
        price: 40,
        offerPrice: 35,
        category: "Vegetables",
        description: [
            "Juicy and ripe",
            "Rich in Vitamin C",
            "Perfect for salads and sauces",
            "Farm fresh quality",
        ],
        imageKey: "tomato_image",
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true,
      },
      {
        id: 3,
        name: "Carrot 500g",
        category: "Vegetables",
        price: 30,
        offerPrice: 28,
        imageKey: "carrot_image",
        description: [
          "Sweet and crunchy",
          "Good for eyesight",
          "Ideal for juices and salads",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true,
      },
      {
        id: 4,
        name: "Spinach 500g",
        category: "Vegetables",
        price: 18,
        offerPrice: 15,
        imageKey: "spinach_image_1",
        description: [
          "Rich in iron",
          "High in vitamins",
          "Perfect for soups and salads",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 5,
        name: "Onion 500g",
        category: "Vegetables",
        price: 22,
        offerPrice: 19,
        imageKey: "onion_image_1",
        description: [
          "Fresh and pungent",
          "Perfect for cooking",
          "A kitchen staple",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Fruits
      {
        id: 6,
        name: "Apple 1 kg",
        category: "Fruits",
        price: 120,
        offerPrice: 110,
        imageKey: "apple_image",
        description: [
          "Crisp and juicy",
          "Rich in fiber",
          "Boosts immunity",
          "Perfect for snacking and desserts",
          "Organic and farm fresh",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 7,
        name: "Orange 1 kg",
        category: "Fruits",
        price: 80,
        offerPrice: 75,
        imageKey: "orange_image",
        description: [
          "Juicy and sweet",
          "Rich in Vitamin C",
          "Perfect for juices and salads",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 8,
        name: "Banana 1 kg",
        category: "Fruits",
        price: 50,
        offerPrice: 45,
        imageKey: "banana_image_1",
        description: [
          "Sweet and ripe",
          "High in potassium",
          "Great for smoothies and snacking",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 9,
        name: "Mango 1 kg",
        category: "Fruits",
        price: 150,
        offerPrice: 140,
        imageKey: "mango_image_1",
        description: [
          "Sweet and flavorful",
          "Perfect for smoothies and desserts",
          "Rich in Vitamin A",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 35,
        name: "Grapes 500g",
        category: "Fruits",
        price: 70,
        offerPrice: 65,
        imageKey: "grapes_image_1",
        description: [
          "Fresh and juicy",
          "Rich in antioxidants",
          "Perfect for snacking and fruit salads",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Dairy
      {
        id: 10,
        name: "Amul Milk 1L",
        category: "Dairy",
        price: 60,
        offerPrice: 55,
        imageKey: "amul_milk_image",
        description: [
          "Pure and fresh",
          "Rich in calcium",
          "Ideal for tea, coffee, and desserts",
          "Trusted brand quality",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 11,
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        imageKey: "paneer_image",
        description: [
          "Soft and fresh",
          "Rich in protein",
          "Ideal for curries and snacks",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 12,
        name: "Eggs 12 pcs",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        imageKey: "eggs_image",
        description: [
          "Farm fresh",
          "Rich in protein",
          "Ideal for breakfast and baking",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 13,
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        imageKey: "paneer_image_2",
        description: [
          "Soft and fresh",
          "Rich in protein",
          "Ideal for curries and snacks",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 14,
        name: "Cheese 200g",
        category: "Dairy",
        price: 140,
        offerPrice: 130,
        imageKey: "cheese_image",
        description: [
          "Creamy and delicious",
          "Perfect for pizzas and sandwiches",
          "Rich in calcium",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Drinks
      {
        id: 15,
        name: "Coca-Cola 1.5L",
        category: "Drinks",
        price: 80,
        offerPrice: 75,
        imageKey: "coca_cola_image",
        description: [
          "Refreshing and fizzy",
          "Perfect for parties and gatherings",
          "Best served chilled",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 16,
        name: "Pepsi 1.5L",
        category: "Drinks",
        price: 78,
        offerPrice: 73,
        imageKey: "pepsi_image",
        description: [
          "Chilled and refreshing",
          "Perfect for celebrations",
          "Best served cold",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 17,
        name: "Sprite 1.5L",
        category: "Drinks",
        price: 79,
        offerPrice: 74,
        imageKey: "sprite_image_1",
        description: [
          "Refreshing citrus taste",
          "Perfect for hot days",
          "Best served chilled",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 18,
        name: "Fanta 1.5L",
        category: "Drinks",
        price: 77,
        offerPrice: 72,
        imageKey: "fanta_image_1",
        description: [
          "Sweet and fizzy",
          "Great for parties and gatherings",
          "Best served cold",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 19,
        name: "7 Up 1.5L",
        category: "Drinks",
        price: 76,
        offerPrice: 71,
        imageKey: "seven_up_image_1",
        description: [
          "Refreshing lemon-lime flavor",
          "Perfect for refreshing",
          "Best served chilled",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Grains
      {
        id: 20,
        name: "Basmati Rice 5kg",
        category: "Grains",
        price: 550,
        offerPrice: 520,
        imageKey: "basmati_rice_image",
        description: [
          "Long grain and aromatic",
          "Perfect for biryani and pulao",
          "Premium quality",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 21,
        name: "Wheat Flour 5kg",
        category: "Grains",
        price: 250,
        offerPrice: 230,
        imageKey: "wheat_flour_image",
        description: [
          "High-quality whole wheat",
          "Soft and fluffy rotis",
          "Rich in nutrients",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 22,
        name: "Organic Quinoa 500g",
        category: "Grains",
        price: 450,
        offerPrice: 420,
        imageKey: "quinoa_image",
        description: [
          "High in protein and fiber",
          "Gluten-free",
          "Rich in vitamins and minerals",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 23,
        name: "Brown Rice 1kg",
        category: "Grains",
        price: 120,
        offerPrice: 110,
        imageKey: "brown_rice_image",
        description: [
          "Whole grain and nutritious",
          "Helps in weight management",
          "Good source of magnesium",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 24,
        name: "Barley 1kg",
        category: "Grains",
        price: 150,
        offerPrice: 140,
        imageKey: "barley_image",
        description: [
          "Rich in fiber",
          "Helps improve digestion",
          "Low in fat and cholesterol",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Bakery
      {
        id: 25,
        name: "Brown Bread 400g",
        category: "Bakery",
        price: 40,
        offerPrice: 35,
        imageKey: "brown_bread_image",
        description: [
          "Soft and healthy",
          "Made from whole wheat",
          "Ideal for breakfast and sandwiches",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 26,
        name: "Butter Croissant 100g",
        category: "Bakery",
        price: 50,
        offerPrice: 45,
        imageKey: "butter_croissant_image",
        description: [
          "Flaky and buttery",
          "Freshly baked",
          "Perfect for breakfast or snacks",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 27,
        name: "Chocolate Cake 500g",
        category: "Bakery",
        price: 350,
        offerPrice: 325,
        imageKey: "chocolate_cake_image",
        description: [
          "Rich and moist",
          "Made with premium cocoa",
          "Ideal for celebrations and parties",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 28,
        name: "Whole Bread 400g",
        category: "Bakery",
        price: 45,
        offerPrice: 40,
        imageKey: "whole_wheat_bread_image",
        description: [
          "Healthy and nutritious",
          "Made with whole wheat flour",
          "Ideal for sandwiches and toast",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 29,
        name: "Vanilla Muffins 6 pcs",
        category: "Bakery",
        price: 100,
        offerPrice: 90,
        imageKey: "vanilla_muffins_image",
        description: [
          "Soft and fluffy",
          "Perfect for a quick snack",
          "Made with real vanilla",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
    
      // Instant
      {
        id: 30,
        name: "Maggi Noodles 280g",
        category: "Instant",
        price: 55,
        offerPrice: 50,
        imageKey: "maggi_image",
        description: [
          "Instant and easy to cook",
          "Delicious taste",
          "Popular among kids and adults",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 31,
        name: "Top Ramen 270g",
        category: "Instant",
        price: 45,
        offerPrice: 40,
        imageKey: "top_ramen_image",
        description: [
          "Quick and easy to prepare",
          "Spicy and flavorful",
          "Loved by college students and families",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 32,
        name: "Knorr Cup Soup 70g",
        category: "Instant",
        price: 35,
        offerPrice: 30,
        imageKey: "knorr_soup_image",
        description: [
          "Convenient for on-the-go",
          "Healthy and nutritious",
          "Variety of flavors",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 33,
        name: "Yippee Noodles 260g",
        category: "Instant",
        price: 50,
        offerPrice: 45,
        imageKey: "yippee_image",
        description: [
          "Non-fried noodles for healthier choice",
          "Tasty and filling",
          "Convenient for busy schedules",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      },
      {
        id: 34,
        name: "Oats Noodles 72g",
        category: "Instant",
        price: 40,
        offerPrice: 35,
        imageKey: "maggi_oats_image",
        description: [
          "Healthy alternative with oats",
          "Good for digestion",
          "Perfect for breakfast or snacks",
        ],
        createdAt: "2025-03-25T07:17:46.018Z",
        updatedAt: "2025-03-25T07:18:13.103Z",
        inStock: true
      }
    ];

app.get('/products', (req, res) => {
    console.log('GET /products requested.');
     const mappedProducts = rawProducts.map(p => {
        
        // Defensive check: If the product or its ID is missing, return null
        if (!p || p.id === undefined) {
            console.warn("Skipped malformed product entry.");
            return null; 
        }

        // Only proceed if p and p.id are valid
        return {
            ...p,
            id: p.id.toString(), 
            imageKey: [p.imageKey],
        };
    }).filter(p => p !== null); // Remove all the null entries (the bad products)

    res.json(mappedProducts);
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});

module.exports = app;