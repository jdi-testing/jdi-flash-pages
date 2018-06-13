import { mainReducer } from '../app/reducers/mainReducer';
import * as actions from '../app/actions/siteActions';
import { siteReducerData1, siteReducerData2 } from './fake';

let deleteState = siteReducerData1;
let deleteState2 = siteReducerData2;

describe('Site reducer', function () {
    it('should handle ADD_PAGE', function () {
        let testRes = mainReducer({ PageObjects: [] }, actions.addPage());
        chai.expect(testRes.PageObjects).to.eql([
            {
                "url": "",
                "urlTemplate": "",
                "urlMatch": "Equals",
                "title": "",
                "titleMatch": "Equals",
                "name": "Default Page0",
                "pageId": 0,
                "POcode": "",
                "elements": []
            }
        ])
    });
    it('should handle DELETE_PAGE', function () {
        let res1 = mainReducer(deleteState, actions.deletePage(1));
        chai.expect(res1.PageObjects).to.eql(
            deleteState.PageObjects
        );
        let res2 = mainReducer(deleteState2, actions.deletePage(1));
        chai.expect(res2.PageObjects).to.eql(
            [
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
            ]
        );
    });
    it('should handle SEARCH_PAGE', function () {
        let testRes = mainReducer(deleteState2, actions.searchPage("page 1"));
        chai.expect([{
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
        }]).to.eql(testRes.searchedPages);
    });
    it('should handle SELECT_PAGE', function () {
        let testRes = mainReducer(deleteState2, actions.selectPage(1));
        chai.expect({
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
        }).to.eql(testRes.selectedPage);
    });
    it('should handle EDIT_VALUE', function () {
        let testRes = mainReducer(deleteState2, actions.editValue(["SiteInfo", "siteTitle"], "Test title"));
        chai.expect(testRes.SiteInfo.siteTitle).to.eql("Test title");
        deleteState2.activeTabPageId = 1;
        let testRes2 = mainReducer(deleteState2, actions.editValue(["url"], "Test url"));
        chai.expect(testRes2.PageObjects[0].url).to.eql("Test url");
    });
    it('should handle CLOSE_PAGE', function () {
        let testRes = mainReducer(deleteState2, actions.closePage());
        chai.expect(-1).to.eql(testRes.activeTabPageId);
    });
    it('should handle BACK_TO_SITE', function () {
        let testRes = mainReducer(deleteState2, actions.backToSite());
        chai.expect(-1).to.eql(testRes.activeTabPageId);
        chai.expect(true).to.eql(testRes.SiteDetails);
        chai.expect(false).to.eql(testRes.RulesDetails);
        chai.expect(false).to.eql(testRes.PagesDetails);
        chai.expect(false).to.eql(testRes.ElementsDetails);
    });
});