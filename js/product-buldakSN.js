buldakSN = {
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