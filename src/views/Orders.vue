<template>
  <p id="header" class="text-2xl font-semibold text-center p-10">Brands</p>
  <div id="brands-page" class="w-screen flex justify-center">
    <div
      id="contrainer-brands"
      class="w-auto mx-60 grid grid-cols-4 gap-y-1 gap-x-1 overflow-scroll overflow-x-hidden"
      style="height: 30rem"
    >
      <div v-for="brand in brands" :key="brand.id" id="loopbrands">
        <div class="bg-pink-500 h-40 w-40"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Brands",
  data() {
    return {
      brands: [],
    };
  },
  methods: {
    async getBrands() {
      try {
        const res = await fetch("http://localhost:5000/brands");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.brands = await this.getBrands();
  },
};
</script>
<style>
#contrainer-brands::-webkit-scrollbar {
    width: 16px;
    height: 18px;
}
#contrainer-brands::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 20px;
    background-color:#566573;
}

</style>