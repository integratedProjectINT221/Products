<template>
  <div id="brands-page" class="md:w-screen w-160 flex justify-center">
    <div
      id="contrainer-brands"
      class="grid md:grid-cols-4 grid-cols-2 gap-1  md:overflow-scroll md:overflow-x-hidden w-96 md:w-max"
      style="height: 30rem"
    >
      <div v-for="brand in brands" :key="brand.brandId" id="loopbrands">
        <router-link  :to="{path: `/ProductsbyBrand/${brand.brandId}`}">
          <div 
            class="bg-gray-300 md:h-40 h-44 md:w-40 hover:bg-gray-400 flex justify-center items-center group transition duration-100 cursor-pointer"
          >
            <p
              class="text-gray-800 text-xl font-medium group-hover:text-white transition duration-75 cursor-pointer break-words text-center"
            >
              {{ brand.brandName }}
              
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BrandView",
  props: {
    brands: {
      type: Array,
      require: true,
    },
  },
};
</script>