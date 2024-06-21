<script setup lang="ts">
import { useStoreProducts } from '@/stores/storeProduct';
import { useStoreItems } from '@/stores/storeItems';
import ChoiceItems from '@/components/ChoiceItems.vue'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const products = useStoreProducts()
const items = useStoreItems()


const row = computed(() => {
  products.setRow(route.params.id as string)
  return products.row
})

const prices = computed(() => {
  return products.row.prices.map(el => ({
    ...el,
    top: items.list[items.keys.get(el.top)],
    mid: items.list[items.keys.get(el.mid)],
  }))
})


async function handleInsert() {
  const lastId = await products.apiInsert()
  router.push({ path: `/product/${lastId}` })
  alert('Добавлено');
}


function handleUpdate() {
  products.apiUpdate()
  alert('Обновлено');
}

function handleDelete() {
  if (confirm('Удалить изделие?')) {
    products.apiDelete()
  }
}

</script>



<template>
  <div v-if="row?.deleted">
    Изделие удалено.
  </div>
  <form class="card" v-else-if="row">
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
          @click="row.image = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 50)"
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
      <div class="li" v-for="(p, i) in prices" :key="p.uid">
        <div class="top">{{ p.top.id }}: {{ p.top.name }}</div>
        <div class="mid">{{ p.mid.id }}: {{ p.mid.name }}</div>
        <div class="price"><input type="text" v-model="row.prices[i].price"></div>
      </div>
    </div>

    <!-- <pre>
      {{ row }}
    </pre> -->

    <div class="submit">
      <span class="btn save" v-if="$route.params.id === 'add'" @click="handleInsert">Добавить</span>
      <div v-else>
        <span class="btn save" @click="handleUpdate">Изменить</span>
        <br /><br />
        <span class="btn save" @click="handleDelete">Удалить</span>
      </div>
    </div>
  </form>
</template>


<style scoped>
h2 {
  min-height: 2em;
}
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