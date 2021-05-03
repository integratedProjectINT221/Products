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
          <div id="container-colors" class="w-48 grid grid-cols-7 gap-y-3 gap-x- mt-2">
            <div
              v-for="color in product.colors"
              :key="color.colorId"
               class="flex justify-center items-center w-5 h-5 rounded-full"
              :class="blackBorder(color.colorId)"
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
      url: 'http://localhost:8081',
      productsByBrand: [],
      brand: {},
    };
  },
  methods: {
    blackBorder(colorId){
      if(colorId === '#FFFFFF'){
        return 'border border-gray-400 opacity-80'
      }
    },
    async getProductsbyBrand() {
      try {
        const res = await fetch(
          `${this.url}/productsByBrand/${this.$route.params.brandId}`
        );
        console.log(res)
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