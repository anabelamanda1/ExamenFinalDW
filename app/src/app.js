new Vue({
    el: '#app',
    data: {
      ingredients: [],
      selectedIngredients: [],
      recipes: [],
      recipe: null
    },
    methods: {
      async fetchIngredients() {
        const response = await fetch('app/src/ingredientes.json');
        const data = await response.json();
        this.ingredients = data.ingredients;
        this.recipes = data.recipes;
      },
      cook() {
        this.recipe = this.recipes.find(r =>
          this.selectedIngredients.length >= 2 && 
          this.selectedIngredients.every(ing => r.ingredients.includes(ing))
        );
      },
      clearSelection() {
        this.selectedIngredients = [];
        this.recipe = null; 
      }
    },
    created() {
      this.fetchIngredients();
    },
    template: `
        <div class="flex-container">
        <div v-if="recipe" class="result">
          <div class="result-details">
            <h1>Felicidades has conseguido cocinar un {{ recipe.name }}</h1>
            <div class="result-content">
                <div class="ingredients-list">
                    <p>Ingredientes</p>
                    <ul>
                        <li v-for="ing in selectedIngredients" :key="ing">{{ ing }}</li>
                    </ul>
                </div>
              <img class="recipe-image" :src="recipe.image" alt="Imagen del plato">
            </div>
          </div>
        </div>
        <div v-else class="result">
          <h2>No hay resultados</h2>
        </div>
        <div class="ingredients">
          <h3>Ingredientes</h3>
          <div v-for="(ingredient, index) in ingredients" :key="index">
            <input type="checkbox" :value="ingredient" v-model="selectedIngredients"> {{ ingredient }}
          </div>
          <div class="button-container">
            <button @click="cook">Cocinar</button>
            <button @click="clearSelection">Nuevo</button>
          </div>
        </div>
        </div>
    `
  });
  