<template>
  <q-page  class="flex flex-center bg-blue-grey-1 font-reg">
    <!-- <div class="ds">
      <pre>{{scst}}</pre>
      <pre>{{product}}</pre>
    </div> -->
    <div class="q-pa-sm fixed-top-left">
      <div v-if="inptState"><q-spinner-bars color="indigo-8" size="1.2em"/></div>
      <q-btn rounded flat dense icon="warning" color="red-5" v-else-if="!inptState&&scst!=2" @click="ipttarget.focus()"/>
    </div>
    <div class="fixed-bottom-left q-pl-sm q-pb-md">
      <q-img
        src="~assets/logogv.png"
        spinner-color="primary"
        spinner-size="82px" width="150px"
        @click="fullScreen"
      />
    </div>

    <div>

      <!-- Vista inicial -->
      <template v-if="scst==1">
        <div class="text-center text-blue-grey-12 font-sbl text-h2">Capture código</div>
      </template>

      <!-- Buscando producto !!! -->
      <template v-if="scst==2">
        <div class="text-center">
          <q-spinner-hourglass color="indigo-6" size="8em" />
        </div>
      </template>

      <!-- Vista del producto !!! -->
      <template v-if="scst==3">
        <ProductStand :data="product"/>
      </template>

      <template v-if="scst==4">
        <q-card flat class="text-center transparent">
          <q-card-section>
            <q-icon color="blue-grey-3" size="8em" name="far fa-face-grin-beam-sweat" />
          </q-card-section>
          <q-card-section class="text-blue-grey-5">
            <div class="text-h4">Sin coincidencias</div>
            <!-- <div class="text-h6">Acercate a uno de nuestros socios...</div> -->
          </q-card-section>
        </q-card>
      </template>
    </div>

    <q-form @submit="searchTarget" class="fixed-bottom hidded">
      <q-input
        autofocus filled dense
        @focus="inptState=true"
        @blur="inptState=false"
        v-model="target"
        :disable="scst===2"
        type="text"
        label="Label"
        ref="ipttarget"
        color="green"
      />
    </q-form>
  </q-page>
</template>

<script setup>
  import { ref, nextTick, computed } from 'vue';
  import { useQuasar } from 'quasar';
  import ProductStand from 'src/components/ProductStand.vue';
  import API from 'src/api/api.js'

  const $q = useQuasar();
  /**
   * scst: SCreen STate
   * 1: inicial, en escucha de captura de codigo
   * 2: buscando producto (solo aqui se bloquea el buscador)
   * 3: mostrando producto y en escucha de captura de codigo
   * 4: mostrando error de producto (404,500)
   */
  const scst = ref(1);
  const target = ref("");
  const inptState = ref(false);
  const ipttarget = ref(null);
  const product = ref(null);
  const timeouts = ref(null);

  const searchTarget = async () => {
    timeouts.value ? clearTimeout(timeouts.value) : null;

    scst.value=2;
    const params = { target: target.value }
    const response = await API.info({params});
    console.log(response);

    if(response.status==200){
      product.value = response.data.product;
      scst.value=3;
      // timeouts.value = setTimeout(() => { scst.value=1; }, 25000);
    }else if(response.status==404){
      scst.value=4;
      timeouts.value = setTimeout(() => { scst.value=1; }, 7000);
    }

    target.value="";
    nextTick(() => { ipttarget.value.focus(); });
  }

  const fullScreen = () => {
      console.log("Working....");

      $q.fullscreen.request()
      .then(() => {
        nextTick(() => { ipttarget.value.focus(); });
        console.log("FullsCreen done!!");
      })
      .catch(err => {
        console.log("FullScreen Reject :(");
        console.log(err);
      })
    }
</script>

<style scoped>
  .hidded{ bottom: -50%; }
</style>
