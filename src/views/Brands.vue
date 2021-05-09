<template>
  <p id="header" class="text-2xl text-center p-10">Brands</p>
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
  name: "Brands",
  data() {
    return {
      brands: [],
    };
  },
  methods: {
    async getBrands() {
      try {
        const res = await fetch(`/api/show/brands`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.brands = await this.getBrands();
  },
};
</script>
<style>
#contrainer-brands::-webkit-scrollbar {
  width: 14px;
  height: 18px;
}
#contrainer-brands::-webkit-scrollbar-thumb {
  height: 6px;
  border-left: 3px solid rgba(0, 0, 0, 0);
  border-right: 3px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 10px;
  background-color: #566573;
}
</style>