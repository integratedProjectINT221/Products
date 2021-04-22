<template>
  <div class="home">
    <img
      src="@/assets/logo.png"
      ref="shopping_logo"
      class="absolute w-16 h-16 top-8 left-8"
    />
    <div
      id="nav"
      class="border-black border-b w-screen h-16 pl-36 pt-7 space-x-32"
    >
      <!-- <div id="container-link-text" class="space-x-6 border-2 border-black pt-10"> -->
      <router-link to="/">Home</router-link>
      <router-link to="/shop_collection">Shop Collection</router-link>
      <router-link to="/our_story">Our Strory</router-link>
      <!-- </div> -->
    </div>
    <!-- <div id="body" class="flex-col h-screen w-screen border-2 border-red-500"> -->
    <p id="header" class="text-2xl font-semibold text-center p-10">Home</p>
    <div
      id="product-form"
      class="flex flex-row h-full justify-center space-x-10"
    >
      <div id="component-preview-img">
        <div id="preview-img">
          <p class="font-semibold text-xl">Preview</p>
          <div class="w-80 h-80 mt-4 border-2">
            <img v-if="!changeImage" class="w-80 h-80"
              :src="ConvertFileName.filename"
              ref="Product Image"
            />
          </div>
        </div>
        <div id="upload-file" class="w-80 h-8 mt-4 space-x-4 flex-row flex">
          <button
            class="py-1 px-4 rounded-md text-white bg-green-400 flex-none"
          >
            <label class="custom-file-upload cursor-pointer">
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
          </button>
          <span class="text-gray-500" v-if="changeImage">No file chosen</span>
          <p class="break-all text-gray-500">{{ this.filename }}</p>
        </div>
      </div>
      <div class="flex flex-col w-80 h-96 space-y-2 pt-10">
        <label for="name" class="font-semibold">Name</label>
        <input type="text" name="name" id="name" class="border-gray-400 border" />
        <label for="brand" class="font-semibold">Brand</label>
        <select name="brand" id="brand" class="border-gray-400 border"></select>
        <label for="price" class="font-semibold ">Price</label>
        <div id="container-price">
          <input
            type="text"
            name="price"
            id="price"
            class="w-20 border-gray-400 border"
          />
          <label class="currency p-2">THB</label>
        </div>
        <label for="Description" class="font-semibold">Description</label>
        <textarea
          name="Description"
          id="Description"
          cols="30"
          rows="10"
          class="border-gray-400 border"
        >
        </textarea>
        <div id="color" class="flex flex-row items-center space-x-2">
          <label for="color" class="font-semibold">Color</label>
          <label for="white">White</label><br />
          <input type="checkbox" id="white" name="color" value="white" />
          <label for="Black">Black</label><br />
          <input type="checkbox" id="Black" name="color" value="black" />
        </div>
      </div>
    </div>
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
      filename: "",
      changeImage: true,
    };
  },
  methods: {
    previewFile(event) {
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
        filename: this.filename && require(`../assets/${this.filename}`),
      };
    },
  },
};
</script>
