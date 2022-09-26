<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();

interface Food {
  name: string;
  amount: number;
  unit: "gram" | "piece";
}

const foodList: Food[] = [
  {
    name: "tomato",
    amount: 4,
    unit: "piece",
  },
  {
    name: "potato",
    amount: 3,
    unit: "piece",
  },
  {
    name: "beef",
    amount: 500,
    unit: "gram",
  },
  {
    name: "egg",
    amount: 14,
    unit: "piece",
  },
];
</script>

<template>
  <div class="foodList">
    <h1 class="green">Food in stock</h1>
    <h3>Here shows all the available food you have at home.</h3>

    <ul>
      <li v-for="food in foodList" :key="food.name">
        {{
          `${food.name}: ${food.amount} ${
            food.amount === 1 ? food.unit : food.unit + "s"
          }`
        }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.foodList h1,
.foodList h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .foodList h1,
  .foodList h3 {
    text-align: left;
  }
}
</style>
