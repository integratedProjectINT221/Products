<template>
  <div id="background" class="bg-white h-screen w-screen">
    <router-link to="/">
    <img
      src="@/assets/logo.png"
      ref="shopping_logo"
      class="absolute w-16 h-16 top-8 left-8"
    />
    </router-link>
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
    <router-view />
  </div>
</template>
