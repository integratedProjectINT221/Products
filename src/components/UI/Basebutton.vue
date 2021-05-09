<template>
<div>
    <button class="transition delay-75 rounded-full focus:outline-none" :class="[border,px,py,textcolor,bgcolor,fontwidth,hovercolor,bordercolor,hovertext]">{{label}}</button>
</div>
    
</template>
<script>

export default {
  name: 'Basebutton',
  props: {
        border:{
          type: String,
          default: 'border'
        },
        px:{
          type: String,
          default: 'px-6'
        },
        py:{
          type: String,
          default: 'py-1'
        },
        textcolor: {
          type: String,
          default: 'text-black'
        },
        bgcolor:{
          type: String,
          default: 'bg-transparent'
        },
        bordercolor:{
          type: String,
          defualt: 'border-gray-700'
        },
        fontwidth:{
          type: String,
          default: 'font-medium'
        },
        label:{
          type: String,
          required: true
        },
        hovercolor:{
          type: String,
          default: 'hover:bg-gray-700'
        },
        hovertext:{
          type: String,
          default: 'hover:text-white'
        }
    }
}
</script>
