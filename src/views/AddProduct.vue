
<template>
  <div class="add">
    <p id="header" class="md:text-2xl text-2xl text-center md:p-10 p-5">
      Add new product
    </p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div id="product-form" class="flex lg:flex-row h-full justify-center lg:space-x-16 flex-col items-center">
        <AddEditProduct
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
          :invalidProdImage="invalidProdImage"
          :changeImage="changeImage"
          :selectedFile="selectedFile"
          @preview-img="previewFile"
          :label="label"
          :edit="false"
        />
      </div>
    </form>
  </div>
</template>

<script>
import AddEditProduct from "@/components/AddEditProduct";
export default {
  name: "Add",
  components: { AddEditProduct },
  data() {
    return {
    
      label: "Add",
      validate: {},
      colors: [],
      brands: [],
      products: [],
      invalidProdName: false,
      invalidProdBrand: false,
      invalidProdPrice: false,
      invalidProdDes: false,
      invalidProdDate: false,
      invalidProdColors: false,
      invalidProdImage: false,
      isSubmit: false,
      changeImage: true,
      selectedFile: "",
    };
  },
  methods: {
    submitForm() {
      let i = 0;
      this.invalidProdName = this.validate.name === "" ? true : false;
      this.invalidProdBrand = this.validate.brand === "" ? true : false;
      this.invalidProdPrice =
      this.validate.price === "" ? true : this.validate.price <= 0 ? true : typeof this.validate.price === "string"? true : false;
      this.invalidProdDes = this.validate.description === "" ? true : false;
      this.invalidProdDate = this.validate.date === "" ? true : false;
      this.invalidProdColors = this.validate.colors.length === 0 ? true : false;
      this.invalidProdImage = this.validate.image === "" ? true : false;
      for (i = 0; i < this.products.length; i++) {
        if (
          this.products[i].prodName.toLowerCase() ===
          this.validate.name.toLowerCase()
        ) {
          this.invalidProdName = true;
        }
        if (this.products[i].image === this.validate.image) {
          this.invalidProdImage = true;
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
        for (let i = 0; i < this.validate.colors.length; i++) {
          var color = this.validate.colors;
          delete color[i]["checked"];
        }
        this.products.push({
          prodName: this.validate.name,
          image: this.validate.image,
        });
        this.addProductAndPic();
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
      this.changeImage = true;
    },
    passValidate(validate) {
      this.validate = validate;
    },
    async getColors() {
      try {
        const res = await fetch(`/api/colors`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
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
    async addProductAndPic() {
      try {
        const jsonProduct = JSON.stringify({
          prodId: 1000000,
          prodName: this.validate.name,
          description: this.validate.description,
          price: this.validate.price,
          date: this.validate.date,
          image: this.selectedFile.name,
          brand: this.validate.brand,
          colors: this.validate.colors,
        });
        const blob = new Blob([jsonProduct], {
          type: "application/json",
        });
        let data = new FormData();
        data.append("file", this.selectedFile);
        data.append("product", blob);
        
        await fetch(`/api/products`, {
          method: "POST",
          body: data,
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
    for (let index = 0; index < this.colors.length; index++) {
      this.colors[index]["checked"] = false;
    }
  },
};
</script>

