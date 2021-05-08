
<template>
  <div class="home">
    <p
      v-if="this.isEditing === true"
      id="header"
      class="md:text-2xl text-2xl font-semibold text-center md:p-10 p-5 bg-red-200"
    >
      Add new product
    </p>
    <p
      v-else
      id="header"
      class="md:text-2xl text-2xl font-semibold text-center md:p-10 p-5 bg-red-200"
    >
      Edit product
    </p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div
        id="product-form"
        class="flex lg:flex-row h-full justify-center lg:space-x-16 flex-col items-center bg-blue-200"
      >
        <Groupinput
          v-if="this.isEditing === true"
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
          :label="label.add"
        />
        <Groupinput
          v-else
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
          :label="label.edit"
          :product="product"
          :isEditing="isEditing"
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
  name: "Home",
  props: ["edit"],
  components: { Groupinput },
  data() {
    return {
      product: {},
      isEditing: true,
      label: { add: "Add", edit: "Save Change" },
      validate: {},
      // url: "http://localhost:8081",
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
      changeImage: true,
      selectedFile: "",
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
        console.log(this.validate.colors);
        // this.addProduct();
        this.products.push({
          prodName: this.validate.name,
          image: this.validate.image,
        });
        // this.addPicture();
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
        const res = await fetch(`/colors`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        const res = await fetch(`/products`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBrands() {
      try {
        const res = await fetch(`/brands`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async editProductAndPic() {
      try {
        console.log(this.validate);
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
        console.log(this.selectedFile);
        data.append("file", this.selectedFile);
        data.append("product", blob);
        await fetch(`/products`, {
          method: "PUT",
          body: data,
        });
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },

    async addProductAndPic() {
      try {
        console.log(this.validate);
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
        await fetch(`/products`, {
          method: "POST",
          body: data,
        });
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },
    async getProductById() {
      try {
        const res = await fetch(`/products/${this.$route.params.id}`);
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
    console.log(this.$route.query.edit);
    if (this.$route.query.edit === undefined) {
      return;
    }
    this.isEditing = this.$route.query.edit;
    if (this.isEditing === true) {
      console.log("not edit");
      for (let index = 0; index < this.colors.length; index++) {
        this.colors[index]["checked"] = false;
      }
      return;
    }
    else {
      console.log("edit");
      this.product = await this.getProductById();
      console.log(this.product)
      for (let index = 0; index < this.product.colors.length; index++) {
        for (let i = 0; i < this.colors.length; i++) {
          if (this.product.colors[index].colorId == this.colors[i].colorId) {
            this.product.colors[index]["checked"] = true;
            this.colors[i]["checked"] = true;
          }
        }
      }
    }
  },
};
</script>

