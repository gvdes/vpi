<template>
  <q-card flat class="bg-grey-1 q-pa-lg" v-if="product.imgcover == null">
    <q-card-section horizontal>
      <q-card-section class="q-pa-none">
        <q-card-section class="text-left text-blue-grey-7">
          <div class="text-h4 font-md">{{ product.code }}</div>
          <div class="text-subtitle text-grey-8 font-lg">{{ product.id }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle">{{ product.description }}</div>
        </q-card-section>
        <q-card-section>
          <q-img src="~assets/candytoyslogo.png" spinner-color="grey-4" spinner-size="82px" size="200px" />
        </q-card-section>
      </q-card-section>

      <q-card-section style="width:300px;">
        <q-list separator style="font-size:2em;">
          <q-item v-for="price in prices" :key="price._type">
            <q-item-section class="text-grey-7">{{ price.pricelist.name }}</q-item-section>
            <q-item-section avatar class="text-blue-grey-14">${{ price.price }}</q-item-section>
          </q-item>
        </q-list>

        <div class="q-pt-lg q-pr-md text-right text-h6 text-grey-8" v-if="product.pieces"><small>PxC:</small> <span
            class="text-bold text-green">{{ product.pieces }}</span></div>
      </q-card-section>
    </q-card-section>
  </q-card>


  <div class="fullscreen-container" v-else>
    <video class="background-video" :src="`https://grupovizcarra.net/vmedia/${product.imgcover}`" autoplay loop muted
      playsinline autobuffer>
    </video>
    <q-card class="info-card">
      <q-card-section class="text-white">
        <div class="text-h4 font-md">{{ product.code }}</div>
        <div class="text-subtitle text-grey-4 font-lg">{{ product.id }}</div>
      </q-card-section>

      <q-card-section class="text-white">
        <div class="text-subtitle">{{ product.description }}</div>
      </q-card-section>

      <q-card-section>
        <q-img src="~assets/candytoyslogo.png" spinner-color="grey-4" spinner-size="82px" size="200px" />
      </q-card-section>

      <q-card-section>
        <q-list separator style="font-size:1.5em;">
          <q-item v-for="price in prices" :key="price._type">
            <q-item-section class="text-grey-3">
              {{ price.pricelist.name }}
            </q-item-section>
            <q-item-section avatar class="text-white">
              ${{ price.price }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <div class="q-pt-lg q-pr-md text-right text-h6 " v-if="product.pieces">
        <small>PxC:</small>
        <span class="text-bold">{{ product.pieces }}</span>
      </div>
    </q-card>
  </div>








</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  data: { type: Object, default: {} }
});

const product = ref(props.data);

const prices = computed(() => {
  if (product.value) {
    return product.value.prices.length ? product.value.prices.filter(p => p._type <= 2 || p._type == 4).sort((a, b) => a._type - b._type) : [];
  } else { return [] }
});

const imgSource = computed(() => {
  return product.value.imgcover ? true : false;
});
</script>


<style>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100vw;
  min-height: 100vh;
  width: auto;
  height: auto;
  object-fit: cover;
}

.info-card {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 35vw;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  color: white;
}
</style>