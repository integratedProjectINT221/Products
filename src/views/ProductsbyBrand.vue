<template>
  <p
    id="header"
    class="text-2xl font-semibold text-center p-10"
    v-if="this.brand !== null"
  >
    {{ brand.brandName }}
  </p>
  <div id="brands-page" class="md:w-screen md:h-screen flex flex-row w-160 justify-center">
    <div id="contrainer-brands" class="space-y-2 h-full md:w-60">
      <p class="text-lg font-semibold pb-1">Brands</p>
      <div v-for="brand in brands" :key="brand.brandId" id="loopbrands">
        <router-link
          @click="reloadPage(brand)"
          :to="{ path: `/ProductsbyBrand/${brand.brandId}` }"
        >
          <div class="text-base cursor-pointer">
            {{ brand.brandName }}
          </div>
        </router-link>
      </div>
    </div> 
  <div class="md:flex md:justify-start">
    <div class="flex flex-col md:ml-0 px-5">
    <div class="inline-flex space-x-2 md:py-2">
      <router-link to="/Brands">All Brands</router-link
      ><span>></span>
      <router-link :to="{ path: `/ProductsbyBrand/${brand.brandId}` }">{{
        this.brand.brandName
      }}</router-link>
    </div>
    <div id="contrainer-brands" class="grid grid-cols-1 md:grid-cols-4 md:grid md:gap-2 lg:w-170">
      
      <div
        v-for="product in productsByBrand"
        :key="product.prodId"
        id="loopCollection"
      >
        <router-link :to="{ path: `/show/${product.prodId}` }">
          <img
            :src="`/api/files/${product.image}`"
            class="bg-gray-300 md:h-60 md:w-40 w-80 h-96 flex justify-center items-center group cursor-pointer object-cover"
          />
        </router-link>
        <div
          id="container-colors"
          class="w-48 grid grid-cols-7 gap-y-3 gap-x- mt-2"
        >
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
  </div>
</template>
<script>
export default {
  name: "Product Collections",
  data() {
    return {
      productsByBrand: [],
      brand: {},
      brands: [],
    };
  },
  methods: {
    reloadPage(brand) {
      location.assign(`/ProductsbyBrand/${brand.brandId}`);
      console.log("reload!");
    },
    blackBorder(colorId) {
      if (colorId === "#FFFFFF") {
        return "border border-gray-400 opacity-80";
      }
    },
    async getBrands() {
      try {
        const res = await fetch(`/api/brands`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProductsbyBrand() {
      try {
        const res = await fetch(
          `/api/products/productsByBrand/${this.$route.params.brandId}`
        );
        console.log(res);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      this.brands = await this.getBrands();
      this.productsByBrand = await this.getProductsbyBrand();
      this.brand = await this.productsByBrand[0].brand;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>