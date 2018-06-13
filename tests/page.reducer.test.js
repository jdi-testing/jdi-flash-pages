import { mainReducer } from '../app/reducers/mainReducer';
import * as actions from '../app/actions/pageActions';
import * as fake from './fake';

describe('Page reducer', function () {
    let fakeState = {};
    beforeEach(function () {
        fakeState = Object.assign({}, fake.fakeState);
    });
    it('should handle ADD_ELEMENT', function () {
        let testObj = fakeState;
        testObj.activeTabPageId = 1;
        let newState = mainReducer(testObj, actions.addElement(null));
        let copyPageObjectsArray = newState.PageObjects.find((page) => {
            if (page.pageId === newState.activeTabPageId) {
                return page
            }
        }).elements;
        chai.expect(copyPageObjectsArray.length).to.equal(1);
    });
    it('should handle SHOW_PAGE', function () {
        let testObj = fakeState;
        let newState = mainReducer(testObj, actions.showPage(1));
        chai.expect(newState.activeTabPageId).to.equal(1);
    });
    it('should handle SELECT_ELEMENT', function () {
        let testObj = fakeState;
        testObj.activeTabPageId = 0;
        let newState = mainReducer(testObj, actions.selectElement("el123457"));
        chai.expect(newState.selectedElement).to.equal(newState.PageObjects[0].elements[0]);
    });
    it('should handle EDIT_ELEMENT', function () {
        let testObj = fakeState;
        testObj.activeTabPageId = 0;
        testObj.selectedElement = testObj.PageObjects[0].elements[0];
        let newState = mainReducer(testObj, actions.editElement(["Name"], "NewName"));
        chai.expect(newState.selectedElement.Name).to.equal("NewName");
        let newState2 = mainReducer(newState, actions.editElement(["Type"], "Chat"));
        chai.expect(newState2.selectedElement.Type).to.equal("Chat");
        chai.expect(newState2.selectedElement).to.eql(
            {
                Name: 'NewName',
                Type: 'Chat',
                parent: '',
                parentId: 'el123456',
                elId: 'el123457',
                Locator: { path: '', type: '' },
                Enum: '',
                children: [],
                title: 'NewName',
                subtitle: 'Chat'
            });
        });
        it('should handle DELETE_ELEMENT', function () {
            let testObj = fakeState;
            testObj.activeTabPageId = 0;
            let newState = mainReducer(testObj, actions.deleteElement("el123457"));
            chai.expect(newState.PageObjects[0].elements.length).to.equal(0);
        });

    });