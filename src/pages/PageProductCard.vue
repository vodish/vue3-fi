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
      <div class="val"><textarea  v-model="row.descr"></textarea></div>
    </div>
    <div class="row">
      <div class="fld">Картинка</div>
      <div class="val"><input type="text" v-model="row.image" /></div>
    </div>

    <ChoiceItems target="top" />

    <!-- <div class="list">
      <div class="fld">Верх</div>
      <div class="store">
        <div class="thead">
          <div class="id">ID</div>
          <div class="name">Название</div>
          <div class="select"></div>
        </div>
        <div class="tr" v-for="el in items.top">
          <div class="id">{{ el.id }}</div>
          <div class="name">{{ el.name }}</div>
          <div class="select"><span class="btn">Выбрать</span></div>
        </div>
      </div>
      <div class="selected">
        selected
      </div>
    </div> -->


    <div class="price">
      <div class="fld">Цены</div>
      <div class="val">
        ывмывм
      </div>
    </div>



    <div class="submit">
      <span class="btn save">Сохранить</span>
    </div>
  </form>
</template>


<style scoped>
.price { 
  margin-top: 3em;
 }

</style>