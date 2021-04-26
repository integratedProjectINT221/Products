<template>
  <div class="home">
    <p id="header" class="text-2xl font-semibold text-center p-10">Home</p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div
        id="product-form"
        class="flex flex-row h-full justify-center space-x-10"
      >
        <Previewimage
          :invalidProdImage="invalidProdImage"
          :changeImage="changeImage"
          :filename="filename"
          @preview-img="previewFile"
        />
        <Groupinput
          @pass-validate="passValidate"
          :invalidProdName="invalidProdName"
          :invalidProdBrand="invalidProdBrand"
          :invalidProdPrice="invalidProdPrice"
          :invalidProdDes="invalidProdDes"
          :invalidProdDate="invalidProdDate"
          :invalidProdColors="invalidProdColors"
          :colors="colors"
          :brands="brands"
          :isSubmit="isSubmit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Previewimage from "@/components/Previewimage";
import Groupinput from "@/components/Groupinput";
export default {
  name: "Home",
  components: { Previewimage, Groupinput },
  data() {
    return {
      validate: {},
      colors: [
        // { id: "1", name: "white", value: "#FFFFFF", checked: false },
        // { id: "2", name: "black", value: "#000000", checked: false },
      ],
      brands: [
        // { id: "1", name: "test1" },
        // { id: "2", name: "test2" },
      ],
      products: [],
      productHasColor: [
        // {
        //   productId: "",
        //   colorId: "",
        // },
      ],
      invalidProdName: false,
      invalidProdBrand: false,
      invalidProdPrice: false,
      invalidProdDes: false,
      invalidProdDate: false,
      invalidProdColors: false,
      invalidProdImage: false,
      isSubmit: false,
      changeImage: true,
      filename: "",
    };
  },
  methods: {
    submitForm() {
      let i = 0;
      this.invalidProdName = this.validate.name === "" ? true : false;
      this.invalidProdBrand = this.validate.brandId === "" ? true : false;
      this.invalidProdPrice =
        this.validate.price <= 0
          ? true
          : typeof this.validate.price === "string"
          ? true
          : false;
      this.invalidProdDes = this.validate.description === "" ? true : false;
      this.invalidProdDate = this.validate.date === "" ? true : false;
      this.invalidProdColors = !this.validate.colors.length ? true : false;
      this.invalidProdImage = !this.changeImage === false ? true : false;
      for (i = 0; i < this.products.length; i++) {
        if (
          this.products[i].prodName.toLowerCase() ===
          this.validate.name.toLowerCase()
        ) {
          this.invalidProdName = true;
        }
      }
      if (
        this.invalidProdName ||
        this.invalidProdBrand ||
        this.invalidProdPrice ||
        this.invalidProdDes ||
        this.invalidProdDate ||
        this.invalidProdColors ||
        this.invalidProdImage === true
      ) {
        this.isSubmit = false;
        return;
      } else {
        this.addProduct();
        this.addColorsInProduct();
        this.isSubmit = true;
        this.invalidProdName = false;
        this.invalidProdBrand = false;
        this.invalidProdPrice = false;
        this.invalidProdDes = false;
        this.invalidProdDate = false;
        this.invalidProdColors = false;
      }
    },
    previewFile(event) {
      let data = event.target.files[0];
      this.filename = data.name;
      this.changeImage = false;
      this.invalidProdImage = false;
    },
    passValidate(validate) {
      this.validate = validate;
    },
    async getColors() {
      try {
        const res = await fetch("http://localhost:5000/colors");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBrands() {
      try {
        const res = await fetch("http://localhost:5000/brands");
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async addProduct() {
      console.log(this.products)
      try {
        await fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            prodName: this.validate.name,
            description: this.validate.description,
            price: this.validate.price,
            date: this.validate.date,
            brandId: this.validate.brandId,
            image: this.filename,
          }),
          
        });
      } 
      catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },
    async addColorsInProduct() {
    console.log(this.products)
      try {
        await fetch("http://localhost:5000/productsHasColors", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            product: this.products[i]
          }),
        });
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },
  },
  async created() {
    this.colors = await this.getColors();
    this.brands = await this.getBrands();
    this.products = await this.getProducts();
    console.log(this.products)
  },
};
</script>
