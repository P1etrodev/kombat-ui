<template>
  <div class="flex items-center justify-center w-full min-h-screen">
    <div class="flex flex-col gap-4">
      <router-link target="_blank"
        class="p-4 border-2 border-primary rounded-md hover:bg-primary transition ease-in-out duration-[0.3s] font-semibold text-white hover:text-dark w-60 text-center"
        to="/overlay">Overlay</router-link>
      <router-link
        class="p-4 border-2 border-primary rounded-md hover:bg-primary transition ease-in-out duration-[0.3s] font-semibold text-white hover:text-dark w-60 text-center"
        to="/info">Información de partida</router-link>
    </div>
  </div>
</template>