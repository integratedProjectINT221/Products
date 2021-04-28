<template>
  <div>
    <p id="header" class="text-2xl font-semibold text-center p-10">
      {{passBrandName}}
    </p>
    <div id="brands-page" class="w-screen flex justify-center">
      <div id="contrainer-brands" class="grid grid-cols-3 gap-4">
        <div v-for="product in productsByBrand" :key="product.id" id="loopCollection">
          <div
            class="bg-gray-300 h-60 w-48 flex justify-center items-center group cursor-pointer"
          ></div>
          <div id="container-colors" class="w-48 grid grid-cols-7 mt-2">
            <div
              v-for="color in product.colors"
              :key="color.colorId"
              class="flex justify-center items-center border border-gray-400 w-5 h-5 rounded-full"
              :style="{ backgroundColor: color.value }"
            ></div>
          </div>
          <p class="font-medium">{{ product.prodName }}</p>
          <p class="font-base">{{ product.price }} THB</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product Collections",
  props: {
        passBrandId: String,
        passBrandName: String
    },
  data() {
    return {
      productsByBrand:[]
    };
  },
  methods: {
    async getProductsbyBrand() {
      try {
        const res = await fetch(`http://localhost:8081/products/${this.passBrandId}`);
        const data = await res.json();
        this.productsByBrand = data;
        console.log(data)
        console.log(this.productsByBrand)
        return data;
      } catch (error) {
        console.log(error);
      }
    },  
  },
  async created() {
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
    this.productsByBrand = await this.getProductsbyBrand();
  },
};
</script>