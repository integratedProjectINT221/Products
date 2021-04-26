<template>
<Previewimage
          :invalidProdImage="invalidProdImage"
          :changeImage="changeImage"
          :filename="filename"
          @preview-img="previewFile"
        />
</template>