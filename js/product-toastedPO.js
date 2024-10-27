toastedPO = {
		name: "Toasted Perilla Oil",
		price: 31.99,
		description: "Beksul's 100% Toasted Perilla Oil is one of the best-selling perilla oils in Korea. It's made from 100% perilla seeds. Beksul toasts its perilla seeds at a low temperature to retain the seed's nutrition. This perilla oil has a deep, nutty aroma which works beautifully with Bibimbap, namul banchans, and fried eggs.",
		ingredients: ["Gochugaru (Korean red pepper flakes)", "Garlic (minced)", "Ginger (grated or minced)", "Fish sauce or salted seafood (e.g., shrimp paste)", "Sugar or pear juice (for sweetness)", "Green onions (chopped)", "Salt"],
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

const toastedPerillaOil = toastedPO;

const productNameElement = document.getElementById('product-name');
const productDescriptionElement = document.getElementById('product-description');
const productPriceElement = document.getElementById('product-price');
const ingredientsListElement = document.getElementById('ingredients-list');
const showIngredientsButton = document.querySelector('.show-ingredients');

productNameElement.innerHTML = toastedPerillaOil.getName(); 
productDescriptionElement.innerHTML = toastedPerillaOil.getDescription(); 
productPriceElement.innerHTML = `Цена: $${toastedPerillaOil.getPrice()}`; 

showIngredientsButton.addEventListener('click', function() {
    if (ingredientsListElement.classList.contains('show')) {
        
        ingredientsListElement.classList.remove('show');
        setTimeout(() => {
            ingredientsListElement.classList.add('hidden'); 
        }, 500); 
    } else {
        // Clear the hidden class and populate ingredients
        ingredientsListElement.classList.remove('hidden');
        ingredientsListElement.classList.add('show');

        // Clear and add ingredients
        ingredientsListElement.innerHTML = '';
        toastedPerillaOil.getIngredients().forEach(function(ingredient) {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient;
            ingredientsListElement.appendChild(listItem);
        });
    }
});
