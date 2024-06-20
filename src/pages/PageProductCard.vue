<script setup lang="ts">
import { useStoreProducts } from '@/stores/storeProduct';
import { useStoreItems } from '@/stores/storeItems';
import ChoiceItems from '@/components/ChoiceItems.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const products = useStoreProducts()
const items = useStoreItems()


const row = computed(() => {
  if (route.params.id === 'add') return products.row;

  const filter = products.list.filter(el => {
    return Number(route.params.id) === el.id
  })

  return filter[0] || products.row;
})


const prices = computed(() => {
  return row.value.prices.map(el => ({
    ...el,
    top: items.list[items.keys.get(el.top)],
    mid: items.list[items.keys.get(el.mid)],
  }))
})

</script>



<template>
  
  <form class="card" v-if="row">
    <h2>{{ row.name }}</h2>

    <div class="row">
      <div class="fld">Название</div>
      <div class="val"><input type="text" v-model="row.name" /></div>
    </div>

    <div class="row">
      <div class="fld">Описание</div>
      <div class="val"><textarea v-model="row.descr"></textarea></div>
    </div>

    <div class="row">
      <div class="fld">Картинка (<span
          @click="row.image = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 20)"
          style="cursor: pointer;">пример</span>)</div>
      <div class="val"><input type="text" v-model="row.image" /></div>
    </div>
    <div class="image" v-if="row.image">
      <img :src="row.image" />
    </div>

    <br /> <br />
    <ChoiceItems head="Верх" target="top" :selected="row.top" />
    <br /> <br />
    <ChoiceItems head="Cередина" target="mid" :selected="row.mid" />
    <br /> <br />
    <ChoiceItems head="Низ" target="bot" :selected="row.bot" />


    <div class="row prices">
      <div class="fld">Цены</div>
      <div class="li" v-for="(p, i) in prices">
        <div class="top">{{ p.top.id }}: {{ p.top.name }}</div>
        <div class="mid">{{ p.mid.id }}: {{ p.mid.name }}</div>
        <div class="price"><input type="text" v-model="row.prices[i].price"></div>
      </div>
    </div>



    <div class="submit">
      <span class="btn save">Сохранить</span>
    </div>
  </form>
</template>


<style scoped>
.image img {
  max-width: 400px;
}
.prices {
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.prices .fld {
  font-size: 1.2em;
}

.prices .li {
  display: flex;
  gap: 10px;
  align-items: baseline;
  padding-bottom: 5px;
  border-bottom: dotted 1px #ccc;
}

.prices .li .price {
  margin-left: auto;
}

.prices .li input {
  width: 12ch;
  text-align: right;
}

</style>