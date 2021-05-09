<template>
  <p id="header" class="text-2xl text-center p-10">Brands</p>
  <BrandsView :brands="brands"/>
</template>
<script>
import BrandsView from "@/components/BrandsView"
export default {
  components:{
    BrandsView
  },
  name: "Brands",
  data() {
    return {
      brands: [],
    };
  },
  methods: {
    async getBrands() {
      try {
        const res = await fetch(`/api/show/brands`);
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
  width: 14px;
  height: 18px;
}
#contrainer-brands::-webkit-scrollbar-thumb {
  height: 6px;
  border-left: 3px solid rgba(0, 0, 0, 0);
  border-right: 3px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 10px;
  background-color: #566573;
}
</style>