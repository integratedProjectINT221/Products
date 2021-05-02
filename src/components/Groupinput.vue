<template>
  <div id="component-preview-img">
    <div id="preview-img">
      <p class="font-semibold text-xl">Preview</p>
      <div class="w-80 h-80 mt-4 border-2">
        <!-- <base-card> -->
        <img v-if="!changeImage" class="w-80 h-80 object-cover" :src="previewImage" />
        <img v-else class="w-80 h-80 object-cover" :src="`http://localhost:8081/files/${getProduct.image}`" />
        <!-- </base-card> -->
      </div>
      <div class="text-red-500 text-lg font-base" v-if="invalidProdImage">
        Please select your product image!
      </div>
    </div>
    <div id="upload-file" class="w-80 h-8 mt-4 space-x-4 flex-row flex">
      <label
        for="img"
        class="select-none custom-file-upload cursor-pointer py-1 px-4 rounded-md text-white bg-green-400 flex-none focus:outline-none hover:bg-green-300 transition delay-75"
      >
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
      <span class="text-gray-500" v-if="changeImage">{{this.getProduct.image}}</span>
      <p class="break-all text-gray-500" v-else>{{this.editImage}}</p>
    </div>
  </div>
  <div id="container-input" class="flex flex-col w-80 h-1/6 space-y-2 mt-10">
    <label for="name" class="font-semibold">Name</label>
    <input
      v-model="getProduct.prodName"
      type="text"
      name="name"
      id="name"
      class="border-gray-400 border pl-1"
    />{{getProduct.prodName}}
    <div class="text-red-500 text-lg font-base" v-if="invalidProdName">
      Invalid validate name!
    </div>
    <label for="brand" class="font-semibold">Brand</label>
    <select
      v-model="getBrand.brandName"
      name="brand"
      id="brand"
      class="border-gray-400 border pl-1"
    >
      <option
        v-for="brand in brands"
        :key="brand.brandId"
        id="loopbrand"
      >
      
        {{ brand.brandName }}
      </option>
    </select>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdBrand">
      Invalid product brand!
    </div>
    <label for="price" class="font-semibold">Price</label>
    <div id="container-price">
      <input
        v-model.number="getProduct.price"
        type="text"
        name="price"
        id="price"
        class="w-20 border-gray-400 border pl-1"
      />
      <label class="currency p-2">THB</label>
      <div class="text-red-500 text-lg font-base" v-if="invalidProdPrice">
        Invalid product price!
      </div>
    </div>
    <label for="date" class="font-semibold">Date</label>
    <input
      v-model="getProduct.date"
      type="date"
      name="date"
      id="date"
      class="border-gray-400 border pl-1"
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
      class="border-gray-400 border pl-1"
      v-model="getProduct.description"
    >
    </textarea>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdDes">
      Invalid product description!
    </div>
  </div>
  <div id="container-colorsandlabel" class="mt-10">
    <label for="color" class="font-semibold">Color</label>
    <div
      id="container-colors"
      class="w-full h-auto grid grid-cols-6 gap-4 mt-2 "
    >
      <div v-for="color in colors" :key="color.colorId" id="loopcolor">
        <label
          :for="color.colorName"
          class="flex justify-center items-center w-10 h-10 rounded-full select-none"
          :class="blackBorder(color.colorId)"
          :style="{ backgroundColor: color.colorId }"
        >
          <i
            v-show="color.checked"
            class="material-icons text-green-300 text-6xl font-thin"
          >
            radio_button_unchecked
          </i>
        </label>
        <input
          v-model="getProduct.colors"
          type="checkbox"
          :id="color.colorName"
          :value="color"
          class="hidden"
          @change="color.checked = !color.checked"
        />
      </div>
    </div>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdColors">
      Invalid product colors!
    </div>
    <div class="submit-button mt-5 select-none">
      <base-button @click="dataSubmit" :label="label" border="border-2" bordercolor="border-gray-700"></base-button>
    </div>
    <div class="text-green-400 text-lg font-base" v-if="isSubmit">
      Product Added!
    </div>
  </div>
</template>

<script>
export default {
  name: "Groupinput",
  props: {
    editProduct:{
      type: Object,
    },
    editBrand:{
      type: Object,
      require: true
    },
    invalidProdName: {
      type: Boolean,
      require: true,
    },
    invalidProdBrand: {
      type: Boolean,
      require: true,
    },
    invalidProdPrice: {
      type: Boolean,
      require: true,
    },
    invalidProdDes: {
      type: Boolean,
      require: true,
    },
    invalidProdDate: {
      type: Boolean,
      require: true,
    },
    invalidProdColors: {
      type: Boolean,
      require: true,
    },
    isSubmit: {
      type: Boolean,
      require: true,
    },
    colors: {
      type: Array,
      require: true,
    },
    brands: {
      type: Array,
      require: true,
    },
    invalidProdImage: {
      type: Boolean,
      require: true,
    },
    changeImage: {
      type: Boolean,
      require: true,
      default: true,
    },
    // selectedFile: {
    //   type: String,
    //   require: true,
    // },
    label:{
      type: String,
      require: true
    },
  },
  data() {
    return {
      previewImage: null,
      editImage:""
      // product: this.editProduct,
      // brand: this.editBrand
    };
  },
  methods: {
    blackBorder(colorId){
      if(colorId === '#FFFFFF'){
        return 'border border-gray-400 opacity-80'
      }
    },
    previewFile(event) {
      let selectedFile = event.target.files[0];
      this.editImage = selectedFile.name
      if (selectedFile) {
        let reader = new FileReader();
        reader.onload = (event) => {
          console.log(this.previewImage)
          this.previewImage = event.target.result;
          console.log(this.previewImage)
        };
        reader.readAsDataURL(selectedFile);
      }
      // console.log("adding");
      this.$emit("preview-img", selectedFile);
    },
    dataSubmit() {
      const data = {
        name: this.editProduct.prodName,
        price: this.editProduct.price,
        description: this.editProduct.description,
        date: this.editProduct.date,
        brand: this.editBrand,
        colors: this.editProduct.colors,
        image: this.editImage
      };
      this.$emit("pass-validate", data);
      console.log(data)
    },
  },
  computed:{
    getProduct(){
      console.log(this.editProduct)
      // console.log(this.previewImage)
      return this.editProduct
    },
    getBrand(){
      return this.editBrand
    }
  }
};
</script>
