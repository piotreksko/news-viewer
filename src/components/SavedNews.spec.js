import { shallowMount } from '@vue/test-utils';
import SavedNews from './SavedNews';
import { WORLD_NEWS, SPORT } from '../constants/newsCategories';

const defaultCategory = WORLD_NEWS;

describe('SavedNews', () => {
    const news = [{
        id: "world/2020/jun/01/science-and-politics-a-complicated-formula",
        webPublicationDate: "2020-06-01T17:26:00Z",
        webTitle: "TEST ONE",
        webUrl: "https://www.theguardian.com/world/2020/jun/01/science-and-politics-a-complicated-formula",
        category: defaultCategory
      },
      {
        id: "world/2020/apr/14/when-science-and-politics-are-worlds-apart",
        webPublicationDate: "2020-04-14T17:15:27Z",
        webTitle: "TEST TWO",
        webUrl: "https://www.theguardian.com/world/2020/apr/14/when-science-and-politics-are-worlds-apart",
        category: defaultCategory
      }]

    const defaultProps = {
        selectedCategory: defaultCategory,
        savedNews: news,
        updateSavedNews: jest.fn(),
    };

    it('display all news initially', () => {
        const wrapper = shallowMount(SavedNews, { propsData: defaultProps })
        const newsComponents = wrapper.findAll('singlenews-stub');
        expect(newsComponents.length).toEqual(2);
    })
    
    it('display filtered news', async () => {
        const wrapper = shallowMount(SavedNews, { propsData: defaultProps })
        await wrapper.setData({ searchText: news[0].webTitle })
        const newsComponents = wrapper.findAll('singlenews-stub');
        console.log(newsComponents)
        expect(newsComponents.length).toEqual(1);
    })
        
    it('should not display any news if category is different', async () => {
        const wrapper = shallowMount(SavedNews, { propsData: { ...defaultProps, selectedCategory: SPORT } })
        const newsComponents = wrapper.findAll('singlenews-stub');
        expect(newsComponents.length).toEqual(0);
    })
})
