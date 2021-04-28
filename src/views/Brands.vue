<template>
  <p id="header" class="text-2xl font-semibold text-center p-10">Brands</p>
  <!-- <BrandsView :brands="brands"/> -->
  <div id="brands-page" class="w-screen flex justify-center">
    <div
      id="contrainer-brands"
      class="grid grid-cols-4 gap-1 overflow-scroll overflow-x-hidden"
      style="height: 30rem"
    >
      <div v-for="brand in brands" :key="brand.brandId" id="loopbrands">
        <router-link  :to="{ name: 'Product Colletions', 
           params: { passBrandId: brand.brandId }}">
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
// import BrandsView from "@/components/BrandsView"
export default {
  name: "Brands",
  // components:{
  //   BrandsView
  // },
  data() {
    return {
      brands: [],
      productsByBrand:[]
    };
  },
  methods: {
    
    async getBrands() {
      try {
        const res = await fetch("http://localhost:5000/brands");
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