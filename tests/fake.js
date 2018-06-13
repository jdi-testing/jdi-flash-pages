import { Elements, Locators, ElementFields, HeaderTypes, Rules } from '../app/data/settings';

let fakeTabPages = [{
    "url": "",
    "urlHost": "",
    "urlTemplate": "",
    "urlMatch": "Equals",
    "title": "",
    "titleMatch": "Equals",
    "name": "Default Page 1",
    "pageId": 0,
    "package": "",
    "elements": [
        {
            "expanded": false,
            "Name": "",
            "Type": "Button",
            "parent": "",
            "elId": "el123457",
            "parentId": "el123456",
            "Locator": {
                "type": "",
                "path": ""
            }
        }
    ]
},
{
    "url": "",
    "urlHost": "",
    "urlTemplate": "",
    "urlMatch": "Equals",
    "title": "",
    "titleMatch": "Equals",
    "name": "Default Page 2",
    "pageId": 1,
    "package": "",
    "elements": []
}]

let fakeState = {
    PageObjects: fakeTabPages.slice(),
    SiteInfo: {},
    Elements: [],
    Locators: [],
    activeTabPageId: -1,
    settingsForSite: true,
    activePageObject: {},
    resultTree: [],
    pageMap: new Map(),
    selectedElement: "",
    searchedPages: fakeTabPages.slice(),
    ElementFields: ElementFields,
    selectedRule: '',
    ruleId: -1,
    Rules: {
        "Button": [{ Locator: { path: "", type: "", uniqness: "" }, id: 0 }]
    }
}
//site reducer fake data

let siteReducerData1 = {
    PageObjects: [
        {
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page0",
            "pageId": 0,
            "POcode": "",
            "elements": []
        }
    ]
}
let siteReducerData2 = {
    PageObjects: [
        {
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page " + 1,
            "pageId": 1,
            "POcode": "",
            "elements": []
        },
        {
            "url": "",
            "urlHost": "",
            "urlTemplate": "",
            "urlMatch": "Equals",
            "title": "",
            "titleMatch": "Equals",
            "name": "Default Page " + 2,
            "pageId": 2,
            "POcode": "",
            "elements": []
        }
    ],
    selectedPage: {},
    searchedPages: [],
    SiteInfo: {
        "siteTitle": "",
        "domainName": ""
    },
    activeTabPageId: 11,
    ElementsDetails: false,
    RulesDetails: false,
    PagesDetails: true,
    SiteDetails: false
}

export { fakeTabPages, fakeState, siteReducerData1, siteReducerData2 }