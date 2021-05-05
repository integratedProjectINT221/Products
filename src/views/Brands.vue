<template>
  <p id="header" class="text-2xl font-semibold text-center p-10">Brands</p>
  <!-- <BrandsView :brands="brands"/> -->
  <div id="brands-page" class="md:w-screen flex justify-center w-160">
    <div
      id="contrainer-brands"
      class="grid md:grid-cols-4 grid-cols-2 gap-1 overflow-scroll overflow-x-hidden w-96 md:w-max"
      style="height: 30rem"
    >
      <div v-for="brand in brands" :key="brand.brandId" id="loopbrands">
        <router-link  :to="{path: `/product_collections/${brand.brandId}`}">
          <div 
            class="bg-gray-300 md:h-40 md:w-40 w-44 h-44 hover:bg-gray-400 flex justify-center items-center group transition duration-100 cursor-pointer"
          >
            <div
              class="text-gray-800 text-2xl p-5 font-medium group-hover:text-white transition duration-75 cursor-pointer break-words text-center"
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
// import BrandsView from "@/components/BrandsView"
export default {
  name: "Brands",
  // components:{
  //   BrandsView
  // },
  data() {
    return {
      brands: [],
      url: 'http://localhost:8081',
    };
  },
  methods: {
    async getBrands() {
      try {
        const res = await fetch(`${this.url}/brands`);
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