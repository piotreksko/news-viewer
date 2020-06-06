<template>
  <v-container>
    <v-row dense>
      <v-text-field
        label="Search"
        v-model="searchText"
        outlined
        dense
        class="mx-1"
      ></v-text-field>
      <SingleNews
        v-for="singleNews in newsToDisplay"
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
    selectedCategory: String,
    savedNews: Array,
    updateSavedNews: Function
  },
  components: {
    SingleNews
  },
  data: function() {
    return {
      searchText: ""
    };
  },
  computed: {
    newsToDisplay: function() {
      const filtered = this.savedNews.filter(
        ({ category, webTitle }) =>
          category === this.selectedCategory &&
          webTitle.toLowerCase().includes(this.searchText.toLowerCase())
      );
      return filtered;
    }
  }
};
</script>
