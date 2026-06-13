<template>
  <q-card flat class="bg-grey-1 q-pa-lg">
    <q-card-section horizontal>
      <q-card-section class="q-pa-none">
        <q-card-section class="text-left text-blue-grey-7">
          <div class="text-h4 font-md">{{ product.code }}</div>
          <div class="text-subtitle text-grey-8 font-lg">{{ product.id }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle">{{ product.description }}</div>
        </q-card-section>
        <q-card-section v-if="imageMedia" class="flex flex-center">
          <q-img :src="imageMedia.url" spinner-color="grey-4" spinner-size="82px" />
        </q-card-section>
      </q-card-section>

      <q-card-section style="width:300px;">
        <q-list separator style="font-size:2em;">
          <q-item v-for="price in prices" :key="price._type">
            <q-item-section class="text-grey-7">{{ price.pricelist.name }}</q-item-section>
            <q-item-section avatar class="text-blue-grey-14">${{ price.price }}</q-item-section>
          </q-item>
        </q-list>
        <div class="q-pt-lg q-pr-md text-right text-h6 text-grey-8" v-if="product.pieces">
          <small>PxC:</small> <span class="text-bold text-green">{{ product.pieces }}</span>
        </div>
      </q-card-section>

      <q-card-section v-if="videoMedia">
        <video style="height: 300px; width: 450px;" :src="videoMedia.url" autoplay loop muted></video>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useProduct } from 'src/composables/useProduct.js';

const props = defineProps({
  data: { type: Object, default: () => ({}) }
});

const { product, imageMedia, videoMedia, prices } = useProduct(props);
</script>
