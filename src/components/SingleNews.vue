<template>
  <v-col cols="12">
    <v-card color="secondary" dark>
      <v-card-title style="word-break: normal">{{
        singleNews.webTitle
      }}</v-card-title>
      <v-card-text class="text-left"
        >Publication date:
        {{ singleNews.webPublicationDate | formatDate }}</v-card-text
      >
      <v-card-actions>
        <v-btn @click="openNews(singleNews.webUrl)">Open</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="handleNewsStarClick(singleNews)"
          :color="isSaved(singleNews.id) ? 'indigo' : 'grey'"
        >
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "SingleNews",
  props: { singleNews: Object, savedNews: Array, updateSavedNews: Function },
  methods: {
    openNews: function(url) {
      window.open(url, "_blank");
    },
    handleNewsStarClick: function(news) {
      if (this.isSaved(news.id)) {
        this.unsaveNews(news.id);
      } else this.saveNews(news);
    },
    saveNews: function(news) {
      const withAddedNews = [...this.savedNews, news];
      console.log(withAddedNews)
      this.updateSavedNews(withAddedNews);
    },
    unsaveNews: function(newsId) {
      const filteredNews = this.savedNews.filter(({ id }) => id !== newsId);
      this.updateSavedNews(filteredNews);
    },
    isSaved: function(id) {
      return this.savedNews.some(({ id: newsId }) => newsId === id);
    }
  }
};
</script>
