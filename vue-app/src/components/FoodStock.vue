<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();
import { reactive } from "vue";
import type { Food } from "../types";
import axios from "axios";

const nodeAppUrl = "http://localhost:3000";

const foodList: Food[] = reactive([]);

// READ
async function getCurrentFoodListFromDB(): Promise<Food[]> {
  const foodInDB = await axios.get(nodeAppUrl);
  return foodInDB.data;
}

async function readDBAndUpdateFoodList() {
  const result = await getCurrentFoodListFromDB();
  foodList.length = 0;
  foodList.push(...result);
}

// WRITE
async function incrementPortion(food: Food) {
  const incrementAmount = food.unit === "gram" ? 100 : 1;

  console.log(" + ", food);
  // food.amount += incrementAmount;
  const incrementResult = await axios.post(nodeAppUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { name: food.name, update: { $inc: { amount: incrementAmount } } },
  });
  console.log({ incrementResult });
  if (incrementResult.status === 200) {
    // TODO: only read and update the incremented food item
    await readDBAndUpdateFoodList();
  }
}

async function decrementPortion(food: Food) {
  const decrementAmount = food.unit === "gram" ? 100 : 1;

  console.log(" - ", food);

  const decrementResult = await axios.post(nodeAppUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { name: food.name, update: { $inc: { amount: -decrementAmount } } },
  });
  console.log({ decrementResult });
  if (decrementResult.status === 200) {
    // TODO: only read and update the decremented food item
    await readDBAndUpdateFoodList();
  }
}

async function deleteItem(food: Food) {
  const deletedResult = await axios.delete(nodeAppUrl, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    data: food,
  });

  console.log({ deletedResult });
  if (deletedResult.status === 200) {
    await readDBAndUpdateFoodList();
  }
}

async function addNewFood() {
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

  const newFoodItem: Food = {
    name,
    amount: Number(amount),
    unit: unit.startsWith("p") ? "piece" : "gram",
    expireDate: `${expireYear}-${expireMonth}-${expireDay}`,
  };
  const addNewFoodResult = await axios.put(nodeAppUrl, newFoodItem);
  console.log({ addNewFoodResult });

  if (addNewFoodResult.data.acknowledged) {
    await readDBAndUpdateFoodList();
  }
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
    <button @click="readDBAndUpdateFoodList">Load Food List</button>
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
