import { computed, toRef } from 'vue';

/**
 * Lógica compartida para mostrar un producto:
 * acceso seguro a media y filtrado/ordenamiento de precios.
 *
 * @param {object} props  - props del componente (debe tener `data`)
 */
export function useProduct(props) {
  const product = toRef(props, 'data');

  const media = computed(() => product.value?.media ?? []);

  const imageMedia = computed(() => media.value.find(e => e.type === 'image') ?? null);
  const videoMedia = computed(() => media.value.find(e => e.type === 'video') ?? null);

  const prices = computed(() => {
    if (!product.value?.prices?.length) return [];
    return product.value.prices
      .filter(p => p._type <= 2 || p._type === 4)
      .sort((a, b) => a._type - b._type);
  });

  return { product, media, imageMedia, videoMedia, prices };
}
