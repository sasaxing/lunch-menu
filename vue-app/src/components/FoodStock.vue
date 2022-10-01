<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();

import { reactive } from "vue";
import type { Food } from "../types";
// import { setupDB } from "./MongoDbClient";
import { testFoodList } from "./MongoDbClient";

// type AllFood = Map<string, Food[]>;

// const exampleAllFood: AllFood = new Map([
//   [
//     "garlic",
//     [
//       {
//         amount: 3,
//         unit: "piece",
//         expireDate: "2022-10-10",
//       },
//       { amount: 4, unit: "piece", expireDate: "2022-10-15" },
//     ],
//   ],
// ]);

// const collection = await setupDB();
// const insertResult = await collection.insertMany(testFoodList);
// console.log(" ===> ", { insertResult });

// const foodList: Food[] = (await collection.find({}).toArray()) as any;
const foodList = testFoodList;
foodList.map((food) => delete (food as any)._id);

function incrementPortion(food: Food) {
  const incrementAmount = food.unit === "gram" ? 100 : 1;

  console.log(" + ", food);
  food.amount += incrementAmount;
}

function decrementPortion(food: Food) {
  const decrementAmount = food.unit === "gram" ? 100 : 1;

  console.log(" - ", food);
  food.amount -= decrementAmount;
}

function deleteItem(food: Food) {
  const foodIndex = foodList.indexOf(food);
  foodList.splice(foodIndex, 1);
}

function addNewFood() {
  const userInput = (
    document.getElementById("newFoodInput") as HTMLInputElement
  ).value.replace(/ /g, "");

  if (userInput === "") {
    return;
  }

  const [name, amount, unit, expireDate] = userInput.split(",");
  if (!name || !amount || !unit || !expireDate) {
    return;
  }

  const expireYear = expireDate.slice(0, 4);
  const expireMonth = expireDate.slice(4, 6);
  const expireDay = expireDate.slice(6, 8);

  foodList.push({
    name,
    amount: Number(amount),
    unit: unit.startsWith("p") ? "piece" : "gram",
    expireDate: `${expireYear}-${expireMonth}-${expireDay}`,
  });
}
</script>

<template>
  <div class="foodList">
    <h1 class="green">Food in stock</h1>
    <h3>Here shows all the available food you have at home.</h3>
    <ul>
      <li v-for="food in foodList" :key="foodList.indexOf(food)">
        {{
          `${food.name}: ${food.amount} ${
            food.amount === 1 ? food.unit : food.unit + "s"
          } ${food.expireDate ? "MHB: " + food.expireDate : ""}`
        }}
        <button v-on:click="incrementPortion(food)">+</button>
        <button
          :disabled="food.amount === 0"
          v-on:click="decrementPortion(food)"
        >
          -
        </button>
        <button v-on:click="deleteItem(food)">❌</button>
      </li>
    </ul>
    <input
      type="text"
      id="newFoodInput"
      name="newFoodInput"
      placeholder="garlic,5,piece,20221010"
    />
    <button @click="addNewFood">Add new food</button>
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
