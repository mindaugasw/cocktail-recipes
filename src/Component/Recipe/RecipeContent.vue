<script setup lang="ts">
import type { Recipe } from '@/Service/Database';
import { appBasePath, isDevMode } from '@/Helper/EnvironmentHelper';
import { filterState, persistState } from '@/Service/FilterManager';

const props = defineProps<{
    recipe: Recipe,
    recipeNameSlug: string,
    insideModal: boolean,
}>();

const uploadDateTime = new Date(props.recipe.datePublishedUnix * 1000).toLocaleDateString('lt');
const originalUrl = `https://kokteiline.lt/${props.recipe.primaryCategorySlug}/${props.recipeNameSlug}.html`;
const breakpointClass = props.insideModal ? 'col-lg-6' : 'col-md-6';
</script>

<template>
<div class="row">
    <div class="image-container col-12" :class="breakpointClass">
        <img
            :src="`${appBasePath}/images/recipe/${recipe.image}`"
            :alt="`Receptas ${recipe.name}`"
        />
    </div>

    <div class="col-12" :class="breakpointClass">
        <div class="mb-5">
            <span v-if="recipe.description" class="d-block mb-2">
                {{ recipe.description }}
            </span>
            <span class="d-block fst-italic text-black-50">
                Įkelta {{ uploadDateTime }}

                <a
                    v-if="isDevMode()"
                    :href="originalUrl"
                    target="_blank"
                    class="text-black-50 ms-2"
                >
                    <FAIcon icon="fa-arrow-up-right-from-square"/>
                </a>
            </span>
        </div>

        <h5>Ingridientai</h5>
        <table class="recipe-ingredients table table-striped mb-5">
            <tbody>
            <tr
                v-for="ingredient in recipe.ingredients"
                :key="ingredient.text"
            >
                <td class="ingredient-checkbox-cell">
                    <input
                        type="checkbox"
                        v-if="!ingredient.nonFilterable"
                        v-model="filterState.ingredients[ingredient.primaryAlias]"
                        @change="persistState"
                    >
                </td>
                <td>
                    <span :title="ingredient.primaryAlias">
                        {{ ingredient.text }}
                    </span>

                    <span
                        class="shop-link-container"
                        v-if="ingredient.link"
                    >
                        <a
                            :href="ingredient.link"
                            target="_blank"
                            :title="ingredient.text"
                        >
                            <FAIcon icon="fa-cart-shopping"/>
                        </a>
                    </span>

                    <span
                        class="shop-link-container"
                        v-if="ingredient.primaryAliasLink"
                    >
                        <a
                            :href="ingredient.primaryAliasLink"
                            target="_blank"
                            :title="ingredient.primaryAlias"
                        >
                            <FAIcon icon="fa-cart-plus"/>
                        </a>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>

        <h5>Žingsniai</h5>
        <div class="recipe-steps">
            <ol>
                <li
                    v-for="step in recipe.steps"
                    :key="step"
                >
                    {{ step }}
                </li>
            </ol>
        </div>
    </div>
</div>
</template>

<style scoped>
.image-container {
    text-align: center;
    margin-bottom: 2em;
}

img {
    max-width: 100%;
    border-radius: 25px;
    object-fit: scale-down;
}

.ingredient-checkbox-cell {
    width: 0;
}

.shop-link-container {
    margin-left: 1em;
}

.shop-link-container a {
    color: initial;
    transition: 0.3s;
}

.shop-link-container a:hover {
    display: inline-block;
    opacity: 0.5;
    transform: scale(1.1);
    transition: 0.3s;
}

/*
 * From https://kokteiline.lt/wp-content/themes/chefscuisine/assets/css/style.css?v=2
 * and  https://kokteiline.lt/wp-content/themes/chefscuisine/style.css?ver=6.4.3
 */
.recipe-steps ol {
    list-style-type: none;
    margin: 15px 0 0 34px;
    padding: 0;
    counter-reset: li-counter;
}

.recipe-steps ol > li {
    position: relative;
    margin-bottom: 10px;
    padding: 9px 15px 0 15px;
    line-height: 24px;
}

.recipe-steps ol > li:before {
    position: absolute;
    top: 3px;
    left: -34px;
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 32px;
    color: #555;
    background-color: #f4f4f4;
    content: counter(li-counter);
    counter-increment: li-counter;
}
</style>
