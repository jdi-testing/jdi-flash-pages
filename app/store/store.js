import { createStore, combineReducers } from 'redux';
import { mainReducer } from '../reducers/mainReducer';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';
import { Elements, Locators, ElementFields, HeaderTypes, SimpleRules, ComplexRules, CompositeRules} from '../data/settings';

//change here
/*let initialState = {
    PageObjects: PageObjectJSON.slice(),
    SiteInfo: Object.assign({}, SiteInfoJSON),
    Elements: Elements.slice(),
    Locators: Locators.slice(),
    Rules: Object.assign({}, SimpleRules, ComplexRules, CompositeRules),
    SimpleRules: SimpleRules,
    ComplexRules: ComplexRules,
    CompositeRules: CompositeRules,
    ElementFields: ElementFields,
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: '',
    searchedPages: PageObjectJSON.slice(),
    HeaderTypes: HeaderTypes,
    mainSettings: false,
    rulesSettings: false,
    selectedRule: '',
    ruleId: -1,
    showCode: false,
    sectionCode: '',
    language: 'Java',
    genPOWholeSite: '',
    warningLog: '',
    sections: new Map(),
    secCode: [] 
};*/

let initialState = {
    PageObjects: PageObjectJSON.slice(),
    SiteInfo: Object.assign({}, SiteInfoJSON),
    searchedPages: PageObjectJSON.slice(),
    selectedPage: {},
    activeTabPageId: -1,
    resultTree: [],
    pageMap: new Map(),
    ElementsDetails: false,
    RulesDetails: false,
    PagesDetails: false,
    CodeDetails: false,
    SiteDetails: true,
    SimpleRules: SimpleRules,
    ComplexRules: ComplexRules,
    CompositeRules: CompositeRules,
    ElementFields: ElementFields,
    warningLog: [],
    sections: new Map(),
    JDI: true,
    selectedRule: '',
    ruleId: -1
};

let store = createStore(mainReducer,initialState);

export { store };