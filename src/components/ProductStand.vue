<template>
  <q-card flat class="bg-grey-1">
    <!-- <q-card-section>
      {{ imgSource }}
    </q-card-section> -->
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
          <q-img
          src="~assets/candytoyslogo.png"
          spinner-color="grey-4"
          spinner-size="82px"
          size="200px"
          />
        </q-card-section>
      </q-card-section>

      <q-card-section style="width:250px;">
        <q-list separator style="font-size:1.5em;">
          <q-item v-for="price in prices" :key="price._type">
            <q-item-section class="text-grey-8">{{ price.pricelist.name }}</q-item-section>
            <q-item-section avatar>${{ price.price }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const props = defineProps({
    data:{ type:Object, default:{}}
  });

  const product = ref(props.data);

  const prices = computed(() => {
    if(product.value){
      return product.value.prices.length ? product.value.prices.filter( p => p._type<=4):[];
    }else{ return []}
  });

  const imgSource = computed(() => {
    return product.value.imgcover ? 'Si tiene imagen':'Si tiene imagen';
  });
</script>
