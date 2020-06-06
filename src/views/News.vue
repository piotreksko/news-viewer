<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col sm="12" md="8">
            <v-card>
              <NewsToolbar
                :showSaved="showSaved"
                :setShowSaved="setShowSaved"
              />
              <v-card-text>
                <v-select
                  class="mx-3"
                  :items="newsCategories"
                  v-model="selectedCategory"
                  @change="fetchNews"
                  label="Category"
                  outlined
                  dense
                ></v-select>
                <v-progress-circular
                  v-show="isLoading"
                  :value="60"
                ></v-progress-circular>
                <FreshNews
                  :news="fetchedNews"
                  :fetchNews="fetchNews"
                  :savedNews="savedNews"
                  :updateSavedNews="updateSavedNews"
                  v-if="!isLoading && !showSaved"
                >
                  <v-pagination
                    v-model="page"
                    @input="fetchNews"
                    :length="6"
                    :page="page"
                    total-visible="6"
                    class="mb-4"
                  ></v-pagination>
                </FreshNews>

                <SavedNews
                  v-if="showSaved"
                  :selectedCategory="selectedCategory"
                  :news="fetchedNews"
                  :savedNews="savedNews"
                  :updateSavedNews="updateSavedNews"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import newsCategories, { POLITICS } from "@/constants/newsCategories";
import { getNews } from "../services/newsService";
import NewsToolbar from "../components//NewsToolbar";
import FreshNews from "../components/FreshNews";
import SavedNews from "../components/SavedNews";

const defaultCategory = POLITICS;
const storedNews = JSON.parse(localStorage.getItem("saved_news"));

export default {
  components: { NewsToolbar, FreshNews, SavedNews },
  data: function() {
    return {
      fetchedNews: [],
      isLoading: true,
      newsCategories,
      page: 1,
      savedNewsValue: storedNews || [],
      selectedCategory: defaultCategory,
      showSaved: false
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews: async function() {
      if (this.showSaved) {
        return;
      }
      this.isLoading = true;
      const result = await getNews({
        q: this.selectedCategory,
        page: this.page
      });
      const news = result.data.response.results.map(
        ({ id, webPublicationDate, webTitle, webUrl }) => ({
          id,
          webTitle,
          webUrl,
          webPublicationDate,
          category: this.selectedCategory
        })
      );
      this.fetchedNews = news;
      this.isLoading = false;
    },
    updateSavedNews: function(news) {
      this.savedNews = news;
    },
    setShowSaved: function(bool) {
      this.showSaved = bool;
    }
  },
  computed: {
    savedNews: {
      get: function() {
        return this.savedNewsValue;
      },
      set: function(news) {
        this.savedNewsValue = news;
        localStorage.setItem("saved_news", JSON.stringify(news));
      }
    }
  }
};
</script>
