<script setup lang="ts">
import { ref } from 'vue';

const row = ref({
  name: 'Название материала',
  descr: 'описание',
  unit: 'м',
  price: 1,
  target: '',
  image: '',
})

</script>

<template>
  
  <form class="card">
    <h2>Карточка материала</h2>

    <div class="row">
      <div class="fld">Название</div>
      <div class="val"><input type="text" :value="row.image" /></div>
    </div>
    <div class="row">
      <div class="fld">описание</div>
      <div class="val"><textarea class="descr" :value="row.descr"></textarea></div>
    </div>
    <div class="row">
      <div class="fld">Ед. измерения</div>
      <div class="val"><input type="text" :value="row.unit" /></div>
    </div>
    <div class="row">
      <div class="fld">price</div>
      <div class="val"><input type="text" :value="row.price" /></div>
    </div>
    <div class="row">
      <div class="fld">target</div>
      <div class="val">
        <label> <input type="radio" id="one" value="top" v-model="row.target" /> Верх </label>
        <label> <input type="radio" id="one" value="mid" v-model="row.target" /> Центр </label>
        <label><input type="radio" id="one" value="bot" v-model="row.target" /> Низ </label>
      </div>
    </div>
    <div class="row">
      <div class="fld">Картинка</div>
      <div class="val"><input type="text" :value="row.image" /></div>
    </div>

    <div class="submit">
      <span class="btn save">Сохранить</span>
    </div>
  </form>
</template>

