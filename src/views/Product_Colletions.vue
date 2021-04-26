<template>
  <div>
    <p id="header" class="text-2xl font-semibold text-center p-10">
      Product Collections
    </p>
    <div id="brands-page" class="w-screen flex justify-center">
      <div id="contrainer-brands" class="grid grid-cols-3 gap-4">
        <div v-for="collection in productsHasColors" :key="collection.product.prodId" id="loopCollection">
          <div
            class="bg-gray-300 h-60 w-48 flex justify-center items-center group cursor-pointer"
          >
          </div>
             <div class="flex justify-center items-center border border-gray-400 w-5 h-5" :style="{ backgroundColor: collection.color.value }">
        </div> 
          <p class="font-medium">{{ collection.product.prodName }}</p>
          <p class="font-base">{{ collection.product.price }} THB</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product Collections",
  data() {
    return {
      productsHasColors: [],
    };
  },
  methods: {
    async getProductsHasColors() {
      try {
        const res = await fetch("http://localhost:5000/productsHasColors");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
    this.productsHasColors = await this.getProductsHasColors();
  },
};
</script>