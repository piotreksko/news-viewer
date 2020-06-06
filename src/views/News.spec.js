import { mount, createLocalVue } from "@vue/test-utils";
import News from './News';
import * as NewsService from '../services/newsService';
jest.mock('axios');

describe("News", () => {
    const results = [
    {
      id: "world/2020/jun/01/science-and-politics-a-complicated-formula",
      webPublicationDate: "2020-06-01T17:26:00Z",
      webTitle: "Science and politics: a complicated formula | Letters",
      webUrl: "https://www.theguardian.com/world/2020/jun/01/science-and-politics-a-complicated-formula",
    },
    {
      id: "world/2020/apr/14/when-science-and-politics-are-worlds-apart",
      webPublicationDate: "2020-04-14T17:15:27Z",
      webTitle: "When science and politics are worlds apart | Letters",
      webUrl: "https://www.theguardian.com/world/2020/apr/14/when-science-and-politics-are-worlds-apart",
    },
    {
      id: "world/2020/may/28/fiji-politics-in-chaos-after-main-opposition-party-suspended",
      webPublicationDate: "2020-05-28T00:14:06Z",
      webTitle: "Fiji politics in chaos after main opposition party suspended",
      webUrl: "https://www.theguardian.com/world/2020/may/28/fiji-politics-in-chaos-after-main-opposition-party-suspended",
    }];
    
    const response = {data: {response: {results}}}
    const responsePromise = Promise.resolve(response);
    NewsService.getNews = jest.fn().mockReturnValue(responsePromise)

    it('it should fetch data on mount', () => {
        const wrapper = mount(News);
        expect(NewsService.getNews).toHaveBeenCalledWith({page: 1, q: "Politics"})
    })
});
