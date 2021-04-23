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
        { id: "1", name: "white", value: "#FFFFFF", checked: false },
        { id: "2", name: "black", value: "#000000", checked: false },
      ],
      brands: [
        { id: "1", name: "test1" },
        { id: "2", name: "test2" },
      ],
      products: [],
      productHasColor: [
        {
          productId: "",
          colorId: "",
        },
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
      for (i = 0; i < this.products.length; i++) {
        this.invalidProdName =
          this.validate.name === this.products[i].name ? true : false;
      }
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
      this.invalidProdColors = !this.validate.colors.length ? true : false;
      this.invalidProdImage = !this.changeImage === false ? true : false;
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
  },
};
</script>
