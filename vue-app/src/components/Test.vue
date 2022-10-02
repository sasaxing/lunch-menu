<script setup lang="ts">
import { reactive } from "vue";
import type { Food } from "../types";

const foodList: Food[] = reactive([]);
foodList.concat(
  await fetch("http://localhost:3000", {
    mode: "no-cors", // !!!!???
    headers: {
      "Content-Type": "application/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  })
    .then((response) => {
      // const json = response.json();
      // console.log({ json });
      // return json;
      return [];
    })
    .then((data) => {
      console.log(data);
      return data;
    })
);

// foodList.map((food) => delete (food as any)._id);
</script>

<template>
  <div class="foodList">
    <h1 class="green">Tttttttest</h1>
    <ul>
      <li v-for="food in foodList" :key="foodList.indexOf(food)">
        {{
          `${food.name}: ${food.amount} ${
            food.amount === 1 ? food.unit : food.unit + "s"
          } ${food.expireDate ? "MHB: " + food.expireDate : ""}`
        }}
      </li>
    </ul>
    <input
      type="text"
      id="newFoodInput"
      name="newFoodInput"
      placeholder="garlic,5,piece,20221010"
    />
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

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
