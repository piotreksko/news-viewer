import { shallow } from "@vue/test-utils";
import SingleNews from './SingleNews';

const mockedFunction = jest.fn();
const windowOpenMock = jest.fn();

const defaultProps = {
    singleNews: {
        id: "world/2020/jun/01/science-and-politics-a-complicated-formula",
        webPublicationDate: "2020-06-01T17:26:00Z",
        webTitle: "Science and politics: a complicated formula | Letters",
        webUrl: "https://www.theguardian.com/world/2020/jun/01/science-and-politics-a-complicated-formula",
    },
    savedNews: [],
    updateSavedNews: mockedFunction
}

describe('SingleNews', () => {
    it('should display news title', () => {
        const wrapper = shallow(SingleNews, { propsData: defaultProps });
        expect(wrapper.html()).toContain(defaultProps.singleNews.webTitle)
    });

    it('should save news', () => {
        const wrapper = shallow(SingleNews, { propsData: defaultProps });
        const buttons = wrapper.findAll('v-btn');
        buttons.at(1).trigger('click');
        expect(mockedFunction).toHaveBeenCalledWith([ defaultProps.singleNews ])
    })

    it('should unsave news', () => {
        const wrapper = shallow(SingleNews, { propsData: { ...defaultProps, savedNews: [ defaultProps.singleNews ] } });
        const buttons = wrapper.findAll('v-btn');
        buttons.at(1).trigger('click');
        expect(mockedFunction).toHaveBeenCalledWith([ ])
    })
    
    it('should open news in a new tab', () => {
        const wrapper = shallow(SingleNews, { propsData: defaultProps });
        const buttons = wrapper.findAll('v-btn');
        window.open = windowOpenMock;
        buttons.at(0).trigger('click');
        expect(windowOpenMock).toHaveBeenCalledWith(defaultProps.singleNews.webUrl, "_blank")
    })
})

