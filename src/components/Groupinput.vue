<template>
  <div id="container-input" class="flex flex-col w-80 h-1/6 space-y-2 mt-10">
    <label for="name" class="font-semibold">Name</label>
    <input
      :value ="validate.name"
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
      :value="validate.brand"
      name="brand"
      id="brand"
      class="border-gray-400 border"
    >
      <option
        v-for="brand in brands"
        :key="brand.id"
        id="loopbrand"
        :value="brand.name"
      >
        {{ brand.name }}
      </option>
    </select>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdBrand">
      Invalid product brand!
    </div>
    <label for="price" class="font-semibold">Price</label>
    <div id="container-price">
      <input
        :value="validate.price"
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
      :value="validate.date"
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
      :value="validate.description"
    >
    </textarea>
    <div class="text-red-500 text-lg font-base" v-if="invalidProdDes">
      Invalid product description!
    </div>
    <label for="color" class="font-semibold">Color</label>
    <div id="container-colors" class="w-80 h-12 grid grid-cols-11">
      <div v-for="color in colors" :key="color.id" id="loopcolor">
        <label
          :for="color.name"
          class="flex justify-center items-center border border-gray-400 w-5 h-5"
          :style="{ backgroundColor: color.value }"
        >
          <i v-show="color.checked" class="material-icons text-gray-300">
            check
          </i>
        </label>
        <input
          :value1="validate.colors"
          type="checkbox"
          :id="color.name"
          :value="color.value"
          class="hidden"
          @change="color.checked = !color.checked"
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
    invalidProdprice: {
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
    colors: {
      type: Array,
      require: true,
    },
    brand: {
      type: Array,
      require: true,
    },
    validate: {
        type: Object,
        require: true
    },
  },
  data() {
    // return {
    //   validate: {
    //     productid: "",
    //     name: "",
    //     price: 0.0,
    //     description: "",
    //     date: "",
    //     colors: [],
    //     brand: "",
    //   },
    // };
  },
  methods: {
    // previewFile(event) {
    //   this.$emit('preview-img',event)
    // },
  },
};
</script>

