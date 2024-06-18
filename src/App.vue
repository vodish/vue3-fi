<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const addName = computed(() => {
  if (route.name === 'product') return 'Добавить изделие'
  if (route.name === 'item') return 'Добавить материал'
  return 'Добавить'
})
</script>

<template>
  <header>
    <RouterLink to="/product" :class="{ active: $route.path.startsWith('/product') }" active-class="active">Изделия</RouterLink>
    <RouterLink to="/item" :class="{ active: $route.path.startsWith('/item') }" active-class="active">Материалы</RouterLink>
    <div class="opt">
      <RouterLink class="btn" :to="$route.path + `/add`" v-if="!$route.params.id">{{ addName }}</RouterLink>
      <span class="btn back" @click="$router.go(-1)" v-if="$route.params.id">Вернуться</span>
    </div>
  </header>
  <pre>
</pre>
  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  gap: 1em;
  border-bottom: solid 1px #ccc;
  padding-bottom: 1em;
  margin-bottom: 2em;
  font-size: 18px;
}

.opt {
  margin-left: auto;
}

a.active {
  color: var(--color-text);
}

a.active:hover {
  background-color: transparent;
}
</style>
