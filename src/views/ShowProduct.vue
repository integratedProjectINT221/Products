
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
        <img :src="`http://localhost:8081/files/${this.product.image}`" class="w-80 h-80 object-cover"/>
          <!-- <base-card> -->
          <!-- <img
          v-if="!changeImage"
          class="w-80 h-80"
          :src="require(`@/assets/${filename}`)"
          ref="Product Image"
        > -->
          <!-- </base-card> -->
        
      </div>
      <p class="text-center mt-4">{{ this.product.image }}</p>
    </div>
    <div class="space-y-4 mt-10 w-64">
     <p class="text-3xl border-b border-gray-400 pb-3">{{ this.product.prodName }}</p>
      <div class="space-y-3 text-xl">
        <p>{{ this.brand.brandName }}</p>
        <p>{{ this.product.price }} THB</p>
        <p>{{ this.product.date }}</p>
      </div>
      <p class="text-base break-words">{{ this.product.description }}</p>
      <p class="text-lg font-semibold">Color</p>
      <div id="container-colors" class="w-48 grid grid-cols-9 mt-2 gap-y-3 gap-x-8">
        <div
          v-for="color in product.colors"
          :key="color.colorId"
          class="flex justify-center items-center w-5 h-5 rounded-full"
          :class="blackBorder(color.colorId)"
          :style="{ backgroundColor: color.colorId }"
        ></div>
      </div>
      <div class="flex space-x-10">
       <router-link :to="`/edit/${this.product.prodId}`">
      <base-button label="Edit" border="border-2" bordercolor="border-gray-700"></base-button>
      </router-link>
      <base-button @click="deleteProductsbyId" label="Delete" border="border-2" textcolor="text-red-500" hovercolor="hover:bg-red-500" bordercolor="border-red-500"></base-button>
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
      url: 'http://localhost:8081',
      error:false
    };
  },
  methods: {
     blackBorder(colorId){
      if(colorId === '#FFFFFF'){
        return 'border border-gray-400 opacity-80'
      }
    },
    async getProductsbyId() {
      try {
        const res = await fetch(`${this.url}/products/${this.$route.params.id}`, {
        });
        console.log(res)
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        this.error = true
      }
    },
    async deleteProductsbyId() {
      if(confirm("Do you want to delete this photo?") === false){
        return;
      }
        await fetch(`${this.url}/products/${this.$route.params.id}`, 
        {method: "DELETE"},
        alert("Delete Complete"),
        this.$router.push("/all_product_brands"));
    },
  },
  async created() {
    // this.colors = await this.getColors();
    // this.brands = await this.getBrands();
    this.product = await this.getProductsbyId();
    this.brand = await this.product.brand;
    // console.log(this.passProdId)
  },
};
</script>

