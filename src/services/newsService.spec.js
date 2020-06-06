import Vue from 'vue';
import '../plugins/axios';
import { getNews } from './newsService';
jest.mock('axios');

const mockFn = jest.fn();
Vue.axios.get = mockFn;

describe('newsService', () => {
    it('should get from axios with given params', () => {
        const testParams = { q: 'test' }
        getNews(testParams)
        expect(mockFn).toHaveBeenCalledWith("https://content.guardianapis.com/search", {"params": {"api-key": "test", "q": "test"}})
    })
})
