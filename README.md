# vue-hammerjs
Vue Directive Wrapper for Hammer.js

## Usage

```js
import Vue from 'vue'
import VueHM from 'vue-hammerjs'

Vue.use(VueHM)

<template>
  <div class="index">
    <div class="index-item" v-hm:swipe="onSwipe">Swipe</div>
    <div class="index-item" v-hm:doubletap="onDoubleTap">Double Tap</div>
  </div>
</template>
```
