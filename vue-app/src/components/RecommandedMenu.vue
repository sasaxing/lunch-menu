<script setup lang="ts">
// defineProps<{
//   msg: string;
// }>();
</script>

<template>
  <div class="RecommandedMenu">
    <h1 class="green">Recommended menu</h1>
    <h3>
      Here shows all the potential lunch menu cooked with food you have at home.
    </h3>
  </div>
</template>

<style linsa-style>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.RecommandedMenu h1,
.RecommandedMenu h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .RecommandedMenu h1,
  .RecommandedMenu h3 {
    text-align: left;
  }
}
</style>
