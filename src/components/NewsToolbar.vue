<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title>News</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="setShowSaved(false)" class="mx-2" :outlined="!showSaved">
      All news
    </v-btn>
    <v-btn @click="setShowSaved(true)" class="mx-2" :outlined="showSaved">
      Saved news
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    showSaved: Boolean,
    setShowSaved: Function
  }
};
</script>
