<template>
  <div class="home">
    <p id="header" class="text-2xl font-semibold text-center p-10">Home</p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div
        id="product-form"
        class="flex flex-row h-full justify-center space-x-16"
      >
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
          :invalidProdImage="invalidProdImage"
          :changeImage="changeImage"
          :selectedFile="selectedFile"
          @preview-img="previewFile"
          :label="label"
          :product="product"
          :edit="true"
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
  name: "Edit",
  components: { Groupinput },
  data() {
    return {
      product: {},
      label: "Save Change",
      url: "product-backend-container:8081",
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
      invalidProdName: false,
      invalidProdBrand: false,
      invalidProdPrice: false,
      invalidProdDes: false,
      invalidProdDate: false,
      invalidProdColors: false,
      invalidProdImage: false,
      isSubmit: false,
      changeImage: false,
      selectedFile: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.validate.colors);
      // let i = 0;
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
      // this.invalidProdImage = this.changeImage === false ? true : false;
      // for (i = 0; i < this.products.length; i++) {
      //   if (
      //     this.products[i].prodName.toLowerCase() ===
      //     this.validate.name.toLowerCase()
      //   ) {
      //     this.invalidProdName = true;
      //   }
      // }
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
        // this.editProduct();
        // this.addPicture();
        this.editProductAndPic();
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
      // for(let i = 0; i < this.validate.colors.length; i++ ){
      //   var color = this.validate.colors
      //   delete color[i]["checked"];
      // }
      // console.log(this.validate.colors)
    },
    // async addPicture() {
    //   console.log(this.selectedFile);
    //   let data = new FormData();
    //   data.append("file", this.selectedFile);
    //   console.log(data);
    //   try {
    //     await fetch(`${this.url}/upload`, {
    //       method: "POST",
    //       body: data,
    //     });
    //     console.log(this.onUploadProgress);
    //   } catch (error) {
    //     console.log(`Failed to add product! + ${error}`);
    //   }
    // },
    async editProductAndPic() {
      try {
        console.log(this.validate);
        // await fetch(`${this.url}/products`, {
        //   method: "PUT",

        //   body: JSON.stringify({
        //     prodId:100000,
        //     prodName: this.validate.name,
        //     description: this.validate.description,
        //     price: this.validate.price,
        //     date: this.validate.date,
        //     image: this.selectedFile.name,
        //     brand: this.validate.brand,
        //     colors: this.validate.colors,
        //   }),
        // });
        const jsonProduct = JSON.stringify({
          prodId: this.$route.params.id,
          prodName: this.validate.name,
          description: this.validate.description,
          price: this.validate.price,
          date: this.validate.date,
          image: this.validate.image,
          brand: this.validate.brand,
          colors: this.validate.colors,
        });
        const blob = new Blob([jsonProduct], {
          type: "application/json",
        });
        let data = new FormData();
        console.log(this.selectedFile)
        data.append("file", this.selectedFile);
        data.append("product", blob);
        await fetch(`${this.url}/products`, {
          method: "PUT",
          body: data,
        });
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
        const res = await fetch(`${this.url}/products`);
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
    async getProductById() {
      try {
        const res = await fetch(
          `${this.url}/products/${this.$route.params.id}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.colors = await this.getColors();
    this.brands = await this.getBrands();
    this.products = await this.getProducts();
    this.product = await this.getProductById();
    console.log(this.products.colors);
    // for (let index = 0; index < this.products.length; index++) {

    //   for (let j = 0; j < this.products[index].colors.length; j++) {
    //     this.products[index].colors[j]["checked"] = true;
    //   }

    // console.log(this.products)
    // }
    for (let index = 0; index < this.product.colors.length; index++) {
      for (let i = 0; i < this.colors.length; i++) {
        if (this.product.colors[index].colorId == this.colors[i].colorId) {
          this.product.colors[index]["checked"] = true;
          this.colors[i]["checked"] = true;
        }
      }
    }
  },
};
</script>

