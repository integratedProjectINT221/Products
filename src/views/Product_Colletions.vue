<template>
  <div>
    <p
      id="header"
      class="text-2xl font-semibold text-center p-10"
      v-if="this.brand !== null"
    >
      {{ brand.brandName }}
    </p>

    <div id="brands-page" class="w-screen flex justify-center">
      <div id="contrainer-brands" class="grid grid-cols-3 gap-4">
        <div
          v-for="product in productsByBrand"
          :key="product.prodId"
          id="loopCollection"
        >

          <router-link :to="{ path: `/show/${product.prodId}` }">
            <img :src="`http://localhost:8081/files/${product.image}`"
              class="bg-gray-300 h-60 w-48 flex justify-center items-center group cursor-pointer object-cover">

          </router-link>
          <div id="container-colors" class="w-48 grid grid-cols-7 mt-2">
            <div
              v-for="color in product.colors"
              :key="color.colorId"
              class="flex justify-center items-center border-2 border-gray-700 w-5 h-5 rounded-full"
              :style="{ backgroundColor: color.colorId }"
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
  // props: {
  //   passBrandId: String,
  //   passBrandName: String,
  // },
  data() {
    return {
      productsByBrand: [],
      brand: {},
    };
  },
  methods: {
    async getProductsbyBrand() {
      try {
        const res = await fetch(
          `http://localhost:8081/productsByBrand/${this.$route.params.brandId}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      this.productsByBrand = await this.getProductsbyBrand();
      this.brand = await this.productsByBrand[0].brand;
    } catch (error) {
      console.log(error);
    }
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
  },
};
</script>