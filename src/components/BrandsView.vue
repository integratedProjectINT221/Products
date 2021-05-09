<template>
  <div id="brands-page" class="w-screen flex justify-center">
    <div
      id="contrainer-brands"
      class="grid grid-cols-4 gap-1 overflow-scroll overflow-x-hidden"
      style="height: 30rem"
    >
      <div v-for="brand in brands" :key="brand.id" id="loopbrands">
        <router-link to="/ProductsbyBrand/">
          <div
            class="bg-gray-300 h-40 w-40 hover:bg-gray-400 flex justify-center items-center group transition duration-100 cursor-pointer"
          >
            <div
              class="text-gray-800 text-2xl font-medium group-hover:text-white transition duration-75 cursor-pointer"
            >
              {{ brand.brandName }}
            </div>
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