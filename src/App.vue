<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.path" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.path" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
