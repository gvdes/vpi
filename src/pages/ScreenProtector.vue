<template>
  <q-page class="flex flex-center bg-blue-grey-1 font-reg">
    <div class="fullscreen-container">
      <!-- <video
      autobuffer
      :src="`https://grupovizcarra.net/vmedia/full_video.mp4`" autoplay loop muted
        style="width: 100%; " playsinline class="fullscreen-video"   :class="{ 'blur-video': scst === 3 || scst === 4}">
      </video> -->
      <video ref="bgVideo" :src="videoSrc" autoplay loop muted playsinline preload="auto" webkit-playsinline
        @canplaythrough="onReady" @error="reloadVideo" class="fullscreen-video"
        :class="{ 'blur-video': scst === 3 || scst === 4 }"></video>

    </div>



    <div class="q-pa-sm fixed-top-left">
      <div v-if="inptState"><q-spinner-bars color="indigo-8" size="1.2em" /></div>
      <q-btn rounded flat dense icon="warning" color="red-5" v-else-if="!inptState && scst != 2"
        @click="ipttarget.focus()" />
    </div>
    <div class="fixed-bottom-left q-pl-sm q-pb-md">
      <q-img src="~assets/logogv.png" spinner-color="primary" spinner-size="82px" width="150px" />
    </div>

    <div>

      <template v-if="scst == 1">
        <div class="text-center text-blue-grey-12 font-sbl text-h2">Capture código</div>
        <div class="text-center text-blue-grey-12 font-sbl text-h2">{{ target }}</div>
      </template>

      Buscando producto !!!
      <template v-if="scst == 2">
        <div class="text-center">
          <q-spinner-hourglass color="indigo-6" size="8em" />
        </div>
      </template>

      <template v-if="scst == 3">
        <ProductStand :data="product" />
      </template>

      <template v-if="scst == 4">
        <q-card flat class="text-center ">
          <q-card-section>
            <q-icon color="grey" size="8em" name="far fa-face-grin-beam-sweat" />
          </q-card-section>
          <q-card-section class="text-grey">
            <div class="text-h4">Sin coincidencias</div>
            <!-- <div class="text-h6">Acercate a uno de nuestros socios...</div> -->
          </q-card-section>
        </q-card>
      </template>
    </div>


    <q-form @submit="searchTarget" class="fixed-bottom hidded">
      <q-input autofocus dense @focus="inptState = true" @blur="keepFocus" v-model="target" :disable="scst === 2"
        type="text" ref="ipttarget" hidde />
    </q-form>


  </q-page>
</template>

<script setup>
import { ref, nextTick, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import ProductStand from 'src/components/ProductProtect.vue';
import API from 'src/api/api.js'

const $q = useQuasar();
const scst = ref(1);
const target = ref("");
const inptState = ref(false);
const ipttarget = ref(null);
const product = ref(null);
const timeouts = ref(null);
const bgVideo = ref(null);
const videoSrc = ref('https://grupovizcarra.net/vmedia/full_video.mp4');


const onReady = () => {
  const v = bgVideo.value;
  if (v) {
    v.play().catch(() => {});
  }
};

const reloadVideo = () => {
  const v = bgVideo.value;
  if (!v) return;

  const src = videoSrc.value;
  v.src = '';
  setTimeout(() => {
    v.src = src;
    v.load();
    v.play().catch(() => {});
  }, 500);
};

const searchTarget = async () => {
  timeouts.value ? clearTimeout(timeouts.value) : null;

  scst.value = 2;
  const params = { target: target.value }
  const response = await API.info({ params });
  console.log(response);

  if (response.status == 200) {
    product.value = response.data.product;
    scst.value = 3;
    timeouts.value = setTimeout(() => { scst.value = 1; }, 15000);
  } else if (response.status == 404) {
    scst.value = 4;
    timeouts.value = setTimeout(() => { scst.value = 1; }, 7000);
  }

  target.value = "";
  nextTick(() => { ipttarget.value.focus(); });
}

const keepFocus = () => {
  nextTick(() => {
    if (scst.value !== 2) {
      ipttarget.value.focus()
    }
  });

}

onMounted(() => {
  setInterval(() => {
    const v = bgVideo.value;
    if (!v) return;

    if (v.paused || v.readyState < 3) {
      v.play().catch(() => reloadVideo());
    }
  }, 10000); // cada 10s
});
</script>


<style scoped>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
}

.fullscreen-video {
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

.blur-video {
  filter: blur(8px);
  /* Ajusta el nivel de desenfoque */
  transition: filter 0.5s ease-in-out;
}
</style>
