<template>
  <div id="component-preview-img">
    <div id="preview-img">
      <p class="font-semibold text-xl">Preview</p>
      <div class="w-80 h-80 mt-4 border-2">
        <img
          v-if="!changeImage"
          class="w-80 h-80"
          :src="require(`@/assets/${filename}`)"
          ref="Product Image"
        />
      </div>
      <div class="text-red-500 text-lg font-base" v-if="invalidProdImage">
        Please select your product image!
      </div>
    </div>
    <div id="upload-file" class="w-80 h-8 mt-4 space-x-4 flex-row flex">
      <label
        for="img"
        class="custom-file-upload cursor-pointer py-1 px-4 rounded-md text-white bg-green-400 flex-none focus:outline-none hover:bg-green-300 transition delay-75"
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
      <span class="text-gray-500" v-show="changeImage">No file chosen</span>
      <p class="break-all text-gray-500">{{ filename }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Previewimage",
  props: {
    invalidProdImage: {
      type: Boolean,
      require: true,
    },
    changeImage: {
      type: Boolean,
      require: true,
      default: true,
    },
    filename: {
      type: String,
      require: true,
    },
  },
  methods: {
    previewFile(event) {
      this.$emit("preview-img", event);
    },
  },
};
</script>

