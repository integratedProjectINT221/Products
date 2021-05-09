
<template>
  <div v-show="!this.error"
    id="container-product"
    class="flex md:flex-row h-full md:justify-center md:space-x-10 pt-10 flex-col items-center md:items-start  w-160 md:w-screen"
  >
    <div id="component-preview-img">
      <div class="space-x-2 mb-4">
      <router-link to="/Brands">All Brands</router-link><span>></span>
      <router-link :to="{path: `/ProductsbyBrand/${brand.brandId}`}">{{this.brand.brandName}}</router-link>
      <span>></span><router-link :to="{path: `/show/${this.product.prodId}`}">{{ this.product.prodName }}</router-link>
      </div>
      <div id="preview-img">
        <img :src="`/api/show/file/${this.product.image}`" class="md:w-80 w-96 h-96 md:h-80 object-cover"/>
      </div>
      <p class="text-center mt-4">{{ this.product.image }}</p>
    </div>
    <div class="space-y-4 mt-10 w-96 md:w-64">
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
      <base-button @click="deleteProductbyId" label="Delete" border="border-2" textcolor="text-red-500" hovercolor="hover:bg-red-500" bordercolor="border-red-500"></base-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Show Product",
  data() {
    return {
      product: {},
      brand: {},
      error:false
    };
  },
  methods: {
     blackBorder(colorId){
      if(colorId === '#FFFFFF'){
        return 'border border-gray-400 opacity-80'
      }
    },
    async getProductbyId() {
      try {
        const res = await fetch(`/api/show/product/${this.$route.params.id}`, {
        });
        console.log(res)
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
        this.error = true
      }
    },
    async deleteProductbyId() {
      if(confirm("Do you want to delete this photo?") === false){
        return;
      }
        await fetch(`/api/delete/product/${this.$route.params.id}`, 
        {method: "DELETE"},
        alert("Delete Complete"),
        location.assign(`/ProductsbyBrand/${this.brand.brandId}`,));
    },
  },
  async created() {
    this.product = await this.getProductbyId();
    this.brand = await this.product.brand;
  },
};
</script>

