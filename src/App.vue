<template>
  <div id="background" class="bg-white md:h-screen md:w-screen w-160 font-poppins">
    <router-link to="/">
      <img
        src="@/assets/logo.png"
        ref="shopping_logo"
        class="absolute w-16 h-16 top-8 left-8 z-50"
      />
    </router-link>
    <div
      id="nav"
      class="border-black border-b w-160 md:w-screen h-16 md:pl-36 pl-32 pt-5 md:pt-7 md:space-x-20 md:text-base text-lg font-medium space-x-10"
    > 
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add new</router-link>
      <router-link to="/Brands">Brands</router-link>
      <router-link to="/Team">Team</router-link>
    </div>
    <router-view />
  </div>
</template>
