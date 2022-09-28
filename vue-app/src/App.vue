<script setup lang="ts">
import FoodStock from "./components/FoodStock.vue";
import RecommandedMenu from "./components/RecommandedMenu.vue";

const imageSrc = "/src/assets/hubo.png"; // must be absolute path in the project`
const imageWidth = 350;
const imageHeight = 250;
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      :src="imageSrc"
      :width="imageWidth"
      :height="imageHeight"
    />

    <div class="column">
      <FoodStock />
    </div>

    <div class="column">
      <RecommandedMenu />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
