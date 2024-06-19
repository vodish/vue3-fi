<script setup lang="ts">
import { useStoreItems } from '@/stores/storeItems';
import { computed } from 'vue';

const props = defineProps<{
  target: 'top' | 'mid' | 'bot'
}>()


const items = useStoreItems()
const list = computed(()=> items[props.target])

</script>

<template>
  <div class="list">
    <div class="fld">Верх</div>
    <div class="store">
      <div class="thead">
        <div class="id">ID</div>
        <div class="name">Название</div>
        <div class="select"></div>
      </div>
      <div class="tr" v-for="el in list">
        <div class="id">{{ el.id }}</div>
        <div class="name">{{ el.name }}</div>
        <div class="select"><span class="btn">Выбрать</span></div>
      </div>
    </div>
    <div class="store selected">
      <div class="tr" v-for="el in list">
        <div class="id">{{ el.id }}</div>
        <div class="name">{{ el.name }}</div>
        <div class="select"><span class="btn">Выбрать</span></div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.list > .fld {
  font-size: 26px;
}
.store > div {
  display: flex;
  padding: 2px 10px;
  border: solid 1px transparent;
}

.store > .tr:hover {
  border-color: #ccc;
}

.store > div .id {
  flex-basis: 4ch;
}
.store > div .name {
  flex-basis: 40%;
  flex-grow: 1;
}
.store > div .select {
  flex-basis: 10%;
}


.selected {
  margin-top: 1em;
  padding-top: 1em;
  border-top: solid 1px #ccc;
}
</style>