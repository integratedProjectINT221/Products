<template>
  <div class="edit">
    <p id="header" class="md:text-2xl text-2xl text-center md:p-10 p-5">
      Edit product
    </p>
    <form id="form" method="post" @submit.prevent="submitForm">
      <div id="product-form" class="flex lg:flex-row h-full justify-center lg:space-x-16 flex-col items-center">
        <AddEditProduct
          @pass-validate="passValidate"
          @preview-img="previewFile"
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
          :product="product"
          :edit="true"
        />
      </div>
    </form>
  </div>
</template>

<script>
import AddEditProduct from "@/components/AddEditProduct";
export default {
  name: "Edit",
  components: { AddEditProduct},
  data() {
    return {
      product: {},
      label: "Save Change",
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
      changeImage: false,
      selectedFile: "",
    };
  },
  methods: {
    submitForm() {
      this.invalidProdName = this.validate.name === "" ? true : false;
      this.invalidProdBrand = this.validate.brand === "" ? true : false;
      this.invalidProdPrice =
      this.validate.price === "" ? true : this.validate.price <= 0 ? true : typeof this.validate.price === "string"? true : false;
      this.invalidProdDes = this.validate.description === "" ? true : false;
      this.invalidProdDate = this.validate.date === "" ? true : false;
      this.invalidProdColors = this.validate.colors.length === 0 ? true : false;
      this.invalidProdImage = this.validate.image === "" ? true : false;
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
    },
    async editProductAndPic() {
      try {
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
        data.append("file", this.selectedFile);
        data.append("product", blob);
        await fetch(`/api/edit/product`, {
          method: "PUT",
          body: data,
        });
      } catch (error) {
        console.log(`Failed to add product! + ${error}`);
      }
    },

    async getColors() {
      try {
        const res = await fetch(`/api/show/colors`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        const res = await fetch(`/api/show/products`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBrands() {
      try {
        const res = await fetch(`/api/show/brands`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProductById() {
      try {
        const res = await fetch(
          `/api/show/product/${this.$route.params.id}`
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

