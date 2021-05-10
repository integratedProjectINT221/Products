
<template>
  <div id="component-preview-img" >
    <div id="preview-img">
      <p class="font-semibold text-xl p-1 ">Preview</p>
      <div class="md:w-80 md:h-80 md:mt-4 w-96 h-96">
        <img
          v-if="changeImage"
          class="md:w-80 md:h-80 w-96 h-96 object-cover border-2 bg-gray-300"
          :src="previewImage ||'https://cwimports.com.au/wp-content/uploads/2020/10/no-image.png'"
        />
        <img
          v-else-if='!changeImage || validate.image!==undefined || this.beforeUpdate'
          class="md:w-80 md:h-80 w-96 h-96 object-cover border-2 bg-gray-300"
          :src="`/api/show/file/${validate.image}`"
        />
      </div>
      <div class="text-red-500 text-lg font-base" v-if="invalidProdImage">
        Invalid Image!
      </div>
    </div>
    <div id="upload-file" class="w-80 h-8  mt-4 space-x-4 flex-row flex  items-center">
      <label
        for="img"
        class="select-none custom-file-upload cursor-pointer  py-1 px-4 text-xl md:text-base rounded-md text-white bg-green-400 flex-none focus:outline-none hover:bg-green-300 transition delay-75"
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
      <p class="text-xl md:text-base break-all text-gray-500">{{ validate.image || 'No file chosen' }}</p>
    </div>
  </div>
   <div id="container-input" class="flex flex-col w-80 h-1/6 space-y-2 mt-10">
    <label for="name" class="font-semibold">Name</label>
    <input
      placeholder="Enter your product name"
      v-model="validate.prodName"
      type="text"
      name="name"
      id="name"
      class="border-gray-400 border pl-1 focus:outline-none"
    />
    <div class="text-red-500 text-lg font-base" v-if="invalidProdName">
      Invalid validate name!
    </div>
    <label for="brand" class="font-semibold">Brand</label>
    <select
      v-model="validate.brand"
      name="brand"
      id="brand"
      class="border-gray-400 border pl-1 focus:outline-none"
    >  
      <option value="" selected disabled hidden>Choose brand of your product</option>
      <option
        v-for="brand in brands"
        :key="brand.brandId"
        id="loopbrand"
        :value="brand"
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
        v-model.number="validate.price"
        type="text"
        name="price"
        id="price"
        placeholder="0"
        class="w-20 border-gray-400 border pl-1 focus:outline-none"
      />
      <label class="currency p-2">THB</label>
      <div class="text-red-500 text-lg font-base" v-if="invalidProdPrice">
        Invalid product price!
      </div>
    </div>
    <label for="date" class="font-semibold">Date of Manufactural</label>
    <input
      v-model="validate.date"
      type="date"
      name="date"
      id="date"
      class="border-gray-400 border pl-1 focus:outline-none" 
    />
    <div class="text-red-500 text-lg font-base" v-if="invalidProdDate">
      Invalid product date!
    </div>
    <label for="Description" class="font-semibold">Description</label>
    <textarea
      placeholder="Describe your product"
      name="Description"
      id="Description"
      cols="50"
      rows="4"
      class="border-gray-400 border pl-1 focus:outline-none"
      v-model="validate.description"
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
      class="w-full h-auto grid grid-cols-6 gap-4 mt-2"
    >
      <div v-for="color in colors" :key="color.colorId" id="loopcolor">
        <label
          :for="color.colorName"
          class="flex justify-center items-center w-10 h-10 rounded-full select-none"
          :class="blackBorder(color.colorId)"
          :style="{ backgroundColor: color.colorId }"
        >
          <i
            v-if="color.checked === true"
            class="material-icons text-green-300 text-6xl font-thin"
          >
            radio_button_unchecked
          </i>

        </label>
        <input
          v-model="validate.colors"
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
      <base-button
        @click="dataSubmit"
        :label="label"
        border="border-2"
        bordercolor="border-gray-700"
      ></base-button>
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
    edit: {
      type: Boolean,
      require: true,
      default: false
    },
    product: {
      type: Object,
    },
    label: {
      type: String,
      require: true,
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
    },
  },
  data() {
    return {
      previewImage: null,
      validate: {
        prodName: "",
        price: "",
        description: "",
        date: "",
        brand: "",
        colors: [],
        image: undefined,
      },
    };
  },
  methods: {
    blackBorder(colorId) {
      if (colorId === "#FFFFFF") {
        return "border border-gray-400 opacity-80";
      }
    },
    previewFile(event) {
      let selectedFile = event.target.files[0];
      this.validate.image = selectedFile.name;
      if (selectedFile) {
        let reader = new FileReader();
        reader.onload = (event) => {
          this.previewImage = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
      }
      this.$emit("preview-img", selectedFile);
    },
    dataSubmit() {
      const data = {
        name: this.validate.prodName,
        price: this.validate.price,
        description: this.validate.description,
        date: this.validate.date,
        brand: this.validate.brand,
        colors: this.validate.colors,
        image: this.validate.image,
      };
      this.$emit("pass-validate", data);
    },
  },
  beforeUpdate() {
    if (this.edit===true) {
      this.validate = this.product
      if(this.product.image!==undefined){
        return true
      }
    }
  },
};
</script>

