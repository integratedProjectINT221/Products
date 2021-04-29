<template>
  <div
    id="container-product"
    class="flex flex-row h-full justify-center space-x-10"
  >
    <div id="component-preview-img">
      <!-- <div><router-link to="/all_product_brands"> BRANDS</router-link></div> -->
      <div id="preview-img">
        <div class="w-80 h-80 border-2">
          <!-- <base-card> -->
          <!-- <img
          v-if="!changeImage"
          class="w-80 h-80"
          :src="require(`@/assets/${filename}`)"
          ref="Product Image"
        > -->
          <!-- </base-card> -->
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <p class="text-3xl">{{ this.product.prodName }}</p>
      <div class="space-y-3 text-xl">
        <p>{{product.brand.brandName}}</p>
        <p>{{ this.product.price }} THB</p>
        <p>{{ this.product.date }}</p>
      </div>
      <p class="text-base">{{ this.product.description }}</p>
      <p class="text-lg font-semibold">Color</p>
      <div id="container-colors" class="w-48 grid grid-cols-7 mt-2">
        <div
          v-for="color in product.colors"
          :key="color.colorId"
          class="flex justify-center items-center border border-gray-400 w-5 h-5 rounded-full"
          :style="{ backgroundColor: color.value }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Show Product",
  props: {
    passProdId: String,
  },
  data() {
    return {
      product: {},
    };
  },
  methods: {
    async getProductsbyId() {
      try {
        const res = await fetch(
          `http://localhost:8081/products/${this.passProdId}`
        );
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
    this.product = await this.getProductsbyId();
    console.log(this.product);
  },
};
</script>