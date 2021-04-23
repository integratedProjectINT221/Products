<template>
  <div class="home">
    <p id="header" class="text-2xl font-semibold text-center p-10">Home</p>
    <form id="form" @submit.prevent="submitForm">
      <div
        id="product-form"
        class="flex flex-row h-full justify-center space-x-10"
      >
        <div id="component-preview-img">
          <div id="preview-img">
            <p class="font-semibold text-xl">Preview</p>
            <div class="w-80 h-80 mt-4 border-2">
              <img
                v-if="!changeImage"
                class="w-80 h-80"
                :src="ConvertFileName.filename"
                ref="Product Image"
              />
            </div>
            <div class="text-red-500 text-lg font-base" v-if="invalidProdPrice">
              Please select your product image!
            </div>
          </div>
          <div id="upload-file" class="w-80 h-8 mt-4 space-x-4 flex-row flex">
              <label for="img" class="custom-file-upload cursor-pointer py-1 px-4 rounded-md text-white bg-green-400 flex-none focus:outline-none hover:bg-green-300 transition delay-75">
                <input
                  class="hidden"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  @change="previewFile"
                />
                Choose file
              </label>
            <span class="text-gray-500" v-if="changeImage">No file chosen</span>
            <p class="break-all text-gray-500">{{ this.filename }}</p>
          </div>
        </div>
        <div
          id="container-input"
          class="flex flex-col w-80 h-1/6 space-y-2 mt-10"
        >
          <label for="name" class="font-semibold">Name</label>
          <input
            v-model="validate.name"
            type="text"
            name="name"
            id="name"
            class="border-gray-400 border"
          />
          <div class="text-red-500 text-lg font-base" v-if="invalidProdName">
            Invalid validate name!
          </div>
          <label for="brand" class="font-semibold">Brand</label>
          <select
            v-model="validate.brand"
            name="brand"
            id="brand"
            class="border-gray-400 border"
          >
            <option v-for="(brand) in brands" :key="brand.id" id="loopbrand" :value="brand.name">{{brand.name}}</option>
          </select>
          <div class="text-red-500 text-lg font-base" v-if="invalidProdBrand">
            Invalid product brand!
          </div>
          <label for="price" class="font-semibold">Price</label>
          <div id="container-price">
            <input
              v-model="validate.price"
              type="text"
              name="price"
              id="price"
              class="w-20 border-gray-400 border"
            />
            <label class="currency p-2">THB</label>
            <div class="text-red-500 text-lg font-base" v-if="invalidProdPrice">
              Invalid product price!
            </div>
          </div>
          <label for="date" class="font-semibold">Date</label>
          <input
            v-model="validate.date"
            type="date"
            name="date"
            id="date"
            class="border-gray-400 border"
          />
          <div class="text-red-500 text-lg font-base" v-if="invalidProdDate">
            Invalid product date!
          </div>
          <label for="Description" class="font-semibold">Description</label>
          <textarea
            name="Description"
            id="Description"
            cols="50"
            rows="4"
            class="border-gray-400 border"
            v-model="validate.description"
          >
          </textarea>
          <div class="text-red-500 text-lg font-base" v-if="invalidProdDes">
            Invalid product description!
          </div>
          <label for="color" class="font-semibold">Color</label>
          <div id="container-colors" class="w-80 h-12 grid grid-cols-11">
            <div v-for="(color) in colors" :key="color.id" id="loopcolor">
              <label
                :for="color.name"
                class="flex justify-center items-center border border-gray-400 w-5 h-5"
                :style="{ backgroundColor: color.value }"
              >
              <i v-show="color.checked" class="material-icons text-gray-300"> check </i>
              </label>
              <input
                v-model="validate.colors"
                type="checkbox"
                :id="color.name"
                :value="color.value"
                class="hidden"
                @change="color.checked=!color.checked"
              />
          </div>
        </div>
          <div class="text-red-500 text-lg font-base" v-if="invalidProdColors">
            Invalid product colors!
          </div>
          <div class="submit-button">
            <button
              class="transition delay-75 hover:text-white hover:bg-gray-700 hover:tr py-1 px-6 rounded-full focus:outline-none border-gray-400 border-2 text-base font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
    <!-- </div> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      colors: [
        { id: "1", name: "white", value: "#FFFFFF",checked:false},
        { id: "2", name: "black", value: "#000000",checked:false},
      ],
      brands: [
        { id: "1", name: "test1" },
        { id: "2", name: "test2" },
      ],
      products: [],
      productHasColor:[
        {
          productId: "",
          colorId:""
        }
      ],
      validate:{
        id: "",
        name: "",
        price: null,
        description: "",
        date: "",
        colors: [],
        brand: "",
      },
      filename: "",
      changeImage: true,
      invalidProdName: false,
      invalidProdBrand: false,
      invalidProdPrice: false,
      invalidProdDes: false,
      invalidProdDate: false,
      invalidProdColors: false,
    };
  },
  methods: {
    submitForm() {
      this.invalidProdName = this.validate.name === "" ? true : false;
      this.invalidProdBrand = this.validate.brand === "" ? true : false;
      this.invalidProdPrice = this.validate.price === null ? true : false;
      this.invalidProdDes = this.validate.description === "" ? true : false;
      this.invalidProdDate = this.validate.date === "" ? true : false;
      this.invalidProdColors = !this.validate.colors.length ? true : false;
      if (
        this.invalidProdName ||
        this.invalidProdBrand ||
        this.invalidProdPrice ||
        this.invalidProdDes ||
        this.invalidProdDate ||
        this.invalidProdColors === true
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
      console.log(event);
      let data = event.target.files[0];
      console.log(data);
      this.filename = data.name;
      this.changeImage = false;
    },
  },
  computed: {
    ConvertFileName() {
      return {
        ...this.filename,
        filename: this.filename && require(`@/assets/${this.filename}`),
      };
    },
  },
};
</script>
