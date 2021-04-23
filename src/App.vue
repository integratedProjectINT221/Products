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
      <router-link to="/">Home</router-link>
      <router-link to="/shop_collection">Shop Collection</router-link>
      <router-link to="/our_story">Our Strory</router-link>
    </div>
    <router-view />
  </div>
</template>
