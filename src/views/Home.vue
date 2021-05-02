<template>
  <div class="home">
    <p id="header" class="text-2xl font-semibold text-center p-10">Add</p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div
        id="product-form"
        class="flex flex-row h-full justify-center space-x-16"
      > 
      {{this.validate}}
        <Groupinput
          @pass-validate="passValidate"
          :editProduct="editProduct"
          :editBrand="editBrand"
          :invalidProdName="invalidProdName"
          :invalidProdBrand="invalidProdBrand"
          :invalidProdPrice="invalidProdPrice"
          :invalidProdDes="invalidProdDes"
          :invalidProdDate="invalidProdDate"
          :invalidProdColors="invalidProdColors"
          :colors="colors"
          :brands="brands"
          :isSubmit="isSubmit"
          :invalidProdImage="invalidProdImage"
          :changeImage="changeImage"
          
          :label="label"
          @preview-img="previewFile"
        />
      </div>
    </form>
    <!-- {{this.validate}}
    {{this.checkedColor}} -->
  </div>
</template>

<script>
// import Previewimage from "@/components/Previewimage";
import Groupinput from "@/components/Groupinput";
export default {
  name: "Add",
  components: { Groupinput },
  data() {
    return {
      products:[],
      label: 'Add Product',
      url: 'http://localhost:8081',
      validate: {},
      colors: [
        // { id: "1", name: "white", value: "#FFFFFF", checked: false },
        // { id: "2", name: "black", value: "#000000", checked: false },
      ],
      brands: [
        // { id: "1", name: "test1" },
        // { id: "2", name: "test2" },
      ],
      editBrand:{},
      editProduct: {},
      invalidProdName: false,
      invalidProdBrand: false,
      invalidProdPrice: false,
      invalidProdDes: false,
      invalidProdDate: false,
      invalidProdColors: false,
      invalidProdImage: false,
      isSubmit: false,
      changeImage: true,
      selectedFile:""
    };
  },
  methods: {
    submitForm() {
      console.log(this.validate.colors);
      let i = 0;
      this.invalidProdName = this.validate.name === "" ? true : false;
      this.invalidProdBrand = this.validate.brand === "" ? true : false;
      this.invalidProdPrice =
        this.validate.price <= 0
          ? true
          : typeof this.validate.price === "string"
          ? true
          : false;
      this.invalidProdDes = this.validate.description === "" ? true : false;
      this.invalidProdDate = this.validate.date === "" ? true : false;
      this.invalidProdColors = this.validate.colors.length === 0 ? true : false;
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
        this.editingProduct();
        this.addPicture();
        this.isSubmit = true;
        this.invalidProdName = false;
        this.invalidProdBrand = false;
        this.invalidProdPrice = false;
        this.invalidProdDes = false;
        this.invalidProdDate = false;
        this.invalidProdColors = false;
      }
    },
    previewFile(selectedFile) {
      this.selectedFile = selectedFile;
      this.changeImage = false;
      this.invalidProdImage = false;
    },
    passValidate(validate) {
      this.validate = validate;
      // for(let i = 0; i < this.validate.colors.length; i++ ){
      //   var color = this.validate.colors
      //   delete color[i]["checked"];
      // }
      // console.log(this.validate.colors)
    },
    async addPicture() {
      console.log(this.selectedFile);
      let data = new FormData();
      data.append("file", this.selectedFile);
      console.log(data);
      try {
        await fetch(`${this.url}/upload`, {
          method: "POST",
          body: data,
        });
        console.log(this.onUploadProgress);
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },

    async getColors() {
      try {
        const res = await fetch(`${this.url}/colors`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        const res = await fetch(`${this.url}/products/`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
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
    async editingProduct() {
      try {
        await fetch(`${this.url}/products`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.editProduct),
        });
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },
  },
  async created() {
    this.colors = await this.getColors();
    this.brands = await this.getBrands();
    // this.editProduct = await this.getProductById();
    this.products = await this.getProducts();
    // this.editBrand = await this.editProduct.brand;
    // console.log(this.editProduct.length)
  },
};
</script>
