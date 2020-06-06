<template>
  <v-container>
    <v-row dense>
      <SingleNews
        v-for="singleNews in news"
        :key="singleNews.webUrl"
        :singleNews="singleNews"
        :savedNews="savedNews"
        :updateSavedNews="updateSavedNews"
      />
    </v-row>
  </v-container>
</template>

<script>
import SingleNews from "./SingleNews";

export default {
  props: {
    news: Array,
    fetchNews: Function,
    savedNews: Array,
    updateSavedNews: Function
  },
  components: { SingleNews }
};
</script>
