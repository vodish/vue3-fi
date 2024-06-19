<script setup lang="ts">
import { useStoreProducts } from '@/stores/storeProduct';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const products = useStoreProducts()

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
      <div class="fld">Картинка</div>
      <div class="val"><input type="text" v-model="row.image" /></div>
    </div>

    <div class="list">
      <div class="fld">Верх</div>
      <div class="val">
        {{ row.top }}  
      </div>
    </div>
    
    <div class="list">
      <div class="fld">Центр</div>
      <div class="val">
        {{ row.mid }}  
      </div>
    </div>
    
    <div class="list">
      <div class="fld">Низ</div>
      <div class="val">
        {{ row.bot }}  
      </div>
    </div>
    
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
