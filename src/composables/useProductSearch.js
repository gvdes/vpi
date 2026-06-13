import { ref, nextTick, onUnmounted } from 'vue';
import API from 'src/api/api.js';

/**
 * Lógica compartida de búsqueda de producto por código.
 *
 * Estados de pantalla (scst):
 *   1 → esperando código
 *   2 → buscando (loading)
 *   3 → producto encontrado
 *   4 → sin coincidencias
 *
 * @param {object} options
 * @param {number} options.resetDelay  ms antes de volver al estado 1 tras mostrar resultado (default 10000)
 * @param {number} options.notFoundDelay  ms antes de volver al estado 1 tras "sin coincidencias" (default 7000)
 */
export function useProductSearch({ resetDelay = 10000, notFoundDelay = 7000 } = {}) {
  const scst = ref(1);
  const target = ref('');
  const inptState = ref(false);
  const ipttarget = ref(null);
  const product = ref(null);
  const timeouts = ref(null);

  const clearPending = () => {
    if (timeouts.value) {
      clearTimeout(timeouts.value);
      timeouts.value = null;
    }
  };

  const reset = () => {
    scst.value = 1;
  };

  const searchTarget = async () => {
    clearPending();

    scst.value = 2;
    const params = { target: target.value };
    const response = await API.info({ params });

    if (response.status === 200) {
      product.value = response.data.product;
      scst.value = 3;
      timeouts.value = setTimeout(reset, resetDelay);
    } else if (response.status === 404) {
      scst.value = 4;
      timeouts.value = setTimeout(reset, notFoundDelay);
    }

    target.value = '';
    nextTick(() => { ipttarget.value?.focus(); });
  };

  const keepFocus = () => {
    nextTick(() => {
      if (scst.value !== 2) {
        ipttarget.value?.focus();
      }
    });
  };

  onUnmounted(clearPending);

  return {
    scst,
    target,
    inptState,
    ipttarget,
    product,
    searchTarget,
    keepFocus,
  };
}
