<template>
  <p
    id="header"
    class="text-2xl font-semibold text-center p-10 bg-pink-500"
    v-if="this.brand !== null"
  >
    {{ brand.brandName }}
  </p>
  <!-- <div class="w-screen h-auto flex justify-center">
    <div class="inline-flex space-x-2">
      <router-link to="/all_product_brands">All Brands</router-link
      ><span>></span>
      <router-link :to="{ path: `/product_collections/${brand.brandId}` }">{{
        this.brand.brandName
      }}</router-link>
    </div>
  </div> -->
  <div id="brands-page" class="md:w-screen h-auto flex flex-row md:space-x-12 justify-center bg-green-200 w-160">
    <!-- <div class="flex flex-row bg-blue-700">  -->
    <div id="contrainer-brands" class=" space-y-2 bg-blue-200">
      <p class="text-lg font-semibold pb-1">Brands</p>
      <div v-for="brand in brands" :key="brand.brandId" id="loopbrands">
        <router-link
          @click="reloadPage(brand)"
          :to="{ path: `/product_collections/${brand.brandId}` }"
        >
          <div class="text-base cursor-pointer">
            {{ brand.brandName }}
          </div>
        </router-link>
      </div>
    </div> 
    
    <div class="flex flex-col bg-pink-200 md:ml-0 ml-14">
    <div class="inline-flex space-x-2 bg-yellow-200 md:p-2">
      <router-link to="/all_product_brands">All Brands</router-link
      ><span>></span>
      <router-link :to="{ path: `/product_collections/${brand.brandId}` }">{{
        this.brand.brandName
      }}</router-link>
      </div>
    <div id="contrainer-brands" class="grid grid-cols-1 md:grid-cols-4 md:grid md:gap-2 bg-purple-200 lg:w-170 border-red-600">
      
      <div
        v-for="product in productsByBrand"
        :key="product.prodId"
        id="loopCollection"
      >
        <router-link :to="{ path: `/show/${product.prodId}` }">
          <img
            :src="`http://localhost:8081/files/${product.image}`"
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
  <!-- </div> -->
  
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
      url: "product-backend-container:8081",
      productsByBrand: [],
      brand: {},
      brands: [],
    };
  },
  methods: {
    reloadPage(brand) {
      location.assign(`/product_collections/${brand.brandId}`);
      console.log("reload!");
    },
    blackBorder(colorId) {
      if (colorId === "#FFFFFF") {
        return "border border-gray-400 opacity-80";
      }
    },
    async getBrands() {
      try {
        const res = await fetch(`${this.url}/brands`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProductsbyBrand() {
      try {
        const res = await fetch(
          `${this.url}/productsByBrand/${this.$route.params.brandId}`
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
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
  },
  // async updated(){
  //   try {
  //     this.productsByBrand =  await this.getProductsbyBrand();
  //     this.brand =  await this.productsByBrand[0].brand;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};
</script>