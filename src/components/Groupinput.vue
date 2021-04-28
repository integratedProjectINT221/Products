<template>
  <div id="container-input" class="flex flex-col w-80 h-1/6 space-y-2 mt-10">
    <label for="name" class="font-semibold">Name</label>
    <input
      v-model="validate.name"
      type="text"
      name="name"
      id="name"
      class="border-gray-400 border pl-1"
    />
    <div class="text-red-500 text-lg font-base" v-if="invalidProdName">
      Invalid validate name!
    </div>
    <label for="brand" class="font-semibold">Brand</label>
    <select
      v-model="validate.brand"
      name="brand"
      id="brand"
      class="border-gray-400 border pl-1"
    >
      <option
        v-for="brand in brands"
        :key="brand.brandId"
        id="loopbrand"
        :value="brand"
      >
        {{ brand.brandName}}
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
        class="w-20 border-gray-400 border pl-1"
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
      v-model="validate.description"
    >
    </textarea>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdDes">
      Invalid product description!
    </div>
    <label for="color" class="font-semibold">Color</label>
    <div id="container-colors" class="w-80 h-12 grid grid-cols-11 gap-8">
      <div v-for="(color) in colors" :key="color.colorId" id="loopcolor">
        <label
          :for="color.colorName"
          class="flex justify-center items-center border border-gray-400 w-6 h-6 rounded-full"
          :style="{ backgroundColor: color.value }"
        >
          <i v-show="color.checked" class="material-icons text-gray-300">
            check
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
      <!-- <span>Checked names: {{ validate.colors }}</span> -->
    </div>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdColors">
      Invalid product colors!
    </div>
    <div class="submit-button">
      <button
        class="transition delay-75 hover:text-white hover:bg-gray-700 hover:tr py-1 px-6 rounded-full focus:outline-none border-gray-400 border-2 text-base font-medium"
        @click="dataSubmit"
      >
        Submit
      </button>
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
  },
  data() {
    return {
      validate: {
        name: "",
        price: 0.0,
        description: "",
        date: "",
        brand: "",
        colors:[]
      },
    };
  },
  methods: {
    dataSubmit() {
      // this.count++
      // console.log(this.count)
      // const checkedColor = {
      //   colors: this.validate.colors 
      // }
      // console.log(checkedColor)
      
      const data = {
        name: this.validate.name,
        price: this.validate.price,
        description: this.validate.description,
        date: this.validate.date,
        brand: this.validate.brand,
        colors: this.validate.colors
      };
      this.$emit("pass-validate", data);
      
    },
  },
};
</script>
