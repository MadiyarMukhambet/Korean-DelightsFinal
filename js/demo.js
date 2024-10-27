export const koreanDishes = {
	buldakSN: {
		name: "Buldak Spicy Noodles",
		price: 3.99,
		description: "Buldak Spicy Noodles (Bulldak Bokkeum Myeon) are a popular Korean instant noodle dish known for their intense heat and bold flavors. The seasoning blend typically includes fiery red pepper powder, soy sauce, garlic, sugar, and sometimes chicken flavoring. It’s often paired with sesame seeds and dried seaweed flakes as garnishes. These noodles are stir-fried rather than served as a soup, creating a rich, sticky sauce that clings to the noodles. The name Buldak translates to fire chicken reflecting the dish's extreme spiciness and the inspiration behind its flavor profile.",
		ingredients: ["Red pepper powder (gochugaru or similar)", "Soy sauce", "Garlic (minced or powder)", "Sugar", "Chicken flavoring (optional)", "Sesame seeds", "Dried seaweed flakes (gim)"],
		getPrice: function() {
			return this.price;
		},
		getDescription: function() {
			return this.description;
		},
		getIngredients: function() {
			return this.ingredients;
		}
	},
	KimchiS: {
		name: "Kimchi Seasoning",
		price: 3.99,
		description: "Kimchi seasoning is a blend of spices and ingredients used to give kimchi its distinctive flavor, combining spicy, savory, and tangy elements. The seasoning typically includes gochugaru (Korean red pepper flakes), garlic, ginger, and salted seafood like shrimp or fish sauce for umami richness. Sugar or pear juice adds a hint of sweetness, while green onions and other vegetables contribute freshness. This seasoning is essential for fermenting cabbage, radish, or other vegetables, creating the bold, flavorful base of kimchi. It offers a perfect balance of heat, salt, and tang that defines this iconic Korean dish.",
		ingredients: ["Gochugaru (Korean red pepper flakes)", "Garlic (minced)", "Ginger (grated or minced)", "Fish sauce or salted seafood (e.g., shrimp paste)", "Sugar or pear juice (for sweetness)", "Green onions (chopped)", "Salt"],
		getPrice: function() {
			return this.price;
		},
		getDescription: function() {
			return this.description;
		},
		getIngredients: function() {
			return this.ingredients;
		}
	},
	toastedPO: {
		name: "Toasted Perilla Oil",
		price: 31.99,
		description: "Beksul's 100% Toasted Perilla Oil is one of the best-selling perilla oils in Korea. It's made from 100% perilla seeds. Beksul toasts its perilla seeds at a low temperature to retain the seed's nutrition. This perilla oil has a deep, nutty aroma which works beautifully with Bibimbap, namul banchans, and fried eggs.",
		ingredients: ["100% Toasted perilla seeds oil"],
		getName: function() {
			return this.name;
		},
		getPrice: function() {
			return this.price;
		},
		getDescription: function() {
			return this.description;
		},
		getIngredients: function() {
			return this.ingredients;
		},
		getImage: function() {
			return this.imageUrl;
		}
	}
};