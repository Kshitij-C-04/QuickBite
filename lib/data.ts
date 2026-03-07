const dummyData = {
  categories: [
    { name: "Burgers", description: "Juicy grilled vegetarian burgers" },
    { name: "Pizzas", description: "Oven-baked cheesy pizzas" },
    { name: "Burritos", description: "Rolled Mexican delights" },
    { name: "Sandwiches", description: "Stacked veggie sandwiches" },
    { name: "Wraps", description: "Rolled wraps packed with veggies" },
    { name: "Bowls", description: "Balanced rice and veggie bowls" },
  ],

  customizations: [
    { name: "Extra Cheese", price: 25, type: "topping" },
    { name: "Jalapeños", price: 20, type: "topping" },
    { name: "Onions", price: 10, type: "topping" },
    { name: "Olives", price: 15, type: "topping" },
    { name: "Mushrooms", price: 18, type: "topping" },
    { name: "Tomatoes", price: 10, type: "topping" },
    { name: "Paneer Cubes", price: 30, type: "topping" },
    { name: "Avocado", price: 35, type: "topping" },

    { name: "Coke", price: 30, type: "side" },
    { name: "Fries", price: 35, type: "side" },
    { name: "Garlic Bread", price: 40, type: "side" },
    { name: "Veg Nuggets", price: 50, type: "side" },
    { name: "Iced Tea", price: 28, type: "side" },
    { name: "Salad", price: 33, type: "side" },
    { name: "Potato Wedges", price: 38, type: "side" },
    { name: "Mozzarella Sticks", price: 45, type: "side" },
    { name: "Sweet Corn", price: 25, type: "side" },
    { name: "Choco Lava Cake", price: 42, type: "side" },
  ],

  menu: [
    {
      name: "Classic Veggie Burger",
      description:
        "A delicious grilled veggie patty layered with fresh lettuce, tomato, and creamy cheese. Served inside a soft toasted bun for a classic burger experience.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/044/844/600/large_2x/homemade-fresh-tasty-burger-with-meat-and-cheese-classic-cheese-burger-and-vegetable-ai-generated-free-png.png",
      price: 25.99,
      rating: 4.5,
      calories: 520,
      protein: 18,
      category_name: "Burgers",
      customizations: ["Extra Cheese", "Coke", "Fries", "Onions", "Paneer Cubes"],
    },

    {
      name: "Veggie Supreme Pizza",
      description:
        "A loaded pizza topped with fresh vegetables, melted cheese, and a rich tomato sauce. Baked to perfection with a crispy crust and flavorful toppings.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/023/742/417/large_2x/pepperoni-pizza-isolated-illustration-ai-generative-free-png.png",
      price: 30.99,
      rating: 4.7,
      calories: 680,
      protein: 22,
      category_name: "Pizzas",
      customizations: [
        "Extra Cheese",
        "Jalapeños",
        "Garlic Bread",
        "Coke",
        "Olives",
      ],
    },

    {
      name: "Bean Burrito",
      description:
        "A warm tortilla wrap filled with seasoned beans, rice, and fresh salsa. A hearty Mexican-style dish that is both satisfying and flavorful.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/055/133/581/large_2x/deliciously-grilled-burritos-filled-with-beans-corn-and-fresh-vegetables-served-with-lime-wedge-and-cilantro-isolated-on-transparent-background-free-png.png",
      price: 20.99,
      rating: 4.2,
      calories: 480,
      protein: 18,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Iced Tea", "Fries", "Salad"],
    },

    {
      name: "Paneer Tikka Burger",
      description:
        "A spicy paneer tikka patty grilled to perfection and layered with fresh vegetables. Served in a toasted bun with smoky sauces.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/236/245/large_2x/a-large-hamburger-with-cheese-onions-and-lettuce-free-png.png",
      price: 27.5,
      rating: 4.8,
      calories: 600,
      protein: 24,
      category_name: "Burgers",
      customizations: ["Onions", "Fries", "Coke", "Paneer Cubes", "Avocado"],
    },

    {
      name: "Paneer Caesar Wrap",
      description:
        "Grilled paneer strips wrapped with fresh lettuce and creamy Caesar dressing. A light yet satisfying wrap with bold flavors.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/048/930/603/large_2x/caesar-wrap-grilled-chicken-isolated-on-transparent-background-free-png.png",
      price: 21.5,
      rating: 4.4,
      calories: 470,
      protein: 20,
      category_name: "Wraps",
      customizations: ["Extra Cheese", "Coke", "Potato Wedges", "Tomatoes"],
    },

    {
      name: "Grilled Veggie Sandwich",
      description:
        "A toasted sandwich packed with roasted vegetables, melted cheese, and pesto sauce. Perfectly grilled for a crispy outside and soft inside.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/047/832/012/large_2x/grilled-sesame-seed-bread-veggie-sandwich-with-tomato-and-onion-free-png.png",
      price: 19.99,
      rating: 4.1,
      calories: 420,
      protein: 19,
      category_name: "Sandwiches",
      customizations: ["Mushrooms", "Olives", "Mozzarella Sticks", "Iced Tea"],
    },

    {
      name: "Double Paneer Burger",
      description:
        "A hearty burger featuring two grilled paneer patties stacked with cheese and vegetables. A perfect choice for paneer lovers.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/359/627/large_2x/double-cheeseburger-with-lettuce-tomatoes-cheese-and-sesame-bun-free-png.png",
      price: 32.99,
      rating: 4.9,
      calories: 700,
      protein: 32,
      category_name: "Burgers",
      customizations: [
        "Extra Cheese",
        "Onions",
        "Fries",
        "Coke",
        "Veg Nuggets",
      ],
    },

    {
      name: "Paneer Tikka Wrap",
      description:
        "A flavorful wrap filled with spicy paneer tikka, mint chutney, and crunchy vegetables. A perfect balance of spice and freshness.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/057/913/530/large_2x/delicious-wraps-a-tantalizing-array-of-wraps-filled-with-vibrant-vegetables-succulent-fillings-and-fresh-ingredients-artfully-arranged-for-a-mouthwatering-culinary-experience-free-png.png",
      price: 23.99,
      rating: 4.6,
      calories: 470,
      protein: 20,
      category_name: "Wraps",
      customizations: ["Jalapeños", "Tomatoes", "Salad", "Fries", "Iced Tea"],
    },

    {
      name: "Mexican Burrito Bowl",
      description:
        "A nutritious bowl filled with rice, beans, corn, and guacamole. A wholesome meal packed with flavor and healthy ingredients.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/057/466/374/large_2x/healthy-quinoa-bowl-with-avocado-tomato-and-black-beans-ingredients-free-png.png",
      price: 26.49,
      rating: 4.7,
      calories: 610,
      protein: 24,
      category_name: "Bowls",
      customizations: ["Avocado", "Sweet Corn", "Salad", "Iced Tea"],
    },

    {
      name: "Veggie Club Sandwich",
      description:
        "A layered sandwich filled with grilled vegetables, fresh lettuce, tomato, and melted cheese. A classic club-style sandwich packed with taste.",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/060/364/135/large_2x/a-flavorful-club-sandwich-with-turkey-bacon-and-fresh-vegetables-sliced-and-isolated-on-a-transparent-background-free-png.png",
      price: 27.49,
      rating: 4.5,
      calories: 590,
      protein: 21,
      category_name: "Sandwiches",
      customizations: ["Mushrooms", "Tomatoes", "Mozzarella Sticks", "Iced Tea"],
    },
  ],
};

export default dummyData;