<template>
  <div v-show="!this.error"
    id="container-product"
    class="flex flex-row h-full justify-center space-x-10 pt-10"
  >
    <div id="component-preview-img">
      <div class="space-x-2 mb-4">
      <router-link to="/all_product_brands">All Brands</router-link><span>></span>
      <router-link :to="{path: `/product_collections/${brand.brandId}`}">{{this.brand.brandName}}</router-link>
      <span>></span><router-link :to="{path: `/show/${this.product.prodId}`}">{{ this.product.prodName }}</router-link>
      </div>
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
      <p class="text-center mt-4">{{ this.product.image }}</p>
    </div>
    <div class="space-y-4 mt-10 w-64">
      <p class="text-3xl">{{ this.product.prodName }}</p>
      <div class="space-y-3 text-xl">
        <p>{{ this.brand.brandName }}</p>
        <p>{{ this.product.price }} THB</p>
        <p>{{ this.product.date }}</p>
      </div>
      <p class="text-base">{{ this.product.description }}</p>
      <p class="text-lg font-semibold">Color</p>
      <div id="container-colors" class="w-48 grid grid-cols-7 mt-2">
        <div
          v-for="color in product.colors"
          :key="color.colorId"
          class="flex justify-center items-center border-2 border-gray-700 w-5 h-5 rounded-full"
          :style="{ backgroundColor: color.colorId }"
        ></div>
      </div>
      <div class="space-x-10">
      <button
        class="transition delay-75 hover:text-white hover:bg-gray-700 py-1 px-6 mt-3 rounded-full focus:outline-none border-gray-700 border-2 text-base font-medium"
      >
        Edit
      </button>
      <button
        class="transition delay-75 hover:text-white hover:bg-red-500 py-1 px-6 mt-3 rounded-full focus:outline-none border-red-500  text-red-500 border-2 text-base font-medium"
      >
        Delete
      </button>
      </div>
      <!-- {{$route.params.id}} -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Show Product",
  // props: {
  //   passProdId: String,
  // },
  data() {
    return {
      product: {},
      brand: {},
      error:false
    };
  },
  methods: {
    async getProductsbyId() {
      try {
        const res = await fetch(
          `http://localhost:8081/products/${this.$route.params.id}`
        );
        console.log(res)
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        this.error = true
      }
    },
  },
  async created() {
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
    this.product = await this.getProductsbyId();
    this.brand = await this.product.brand;
    console.log("asdasd")
    
    // console.log(this.passProdId)
  },
};
</script>