import { mainReducer } from '../app/reducers/mainReducer';
import * as actions from '../app/actions/rulesActions';
import * as fake from './fake';

describe('Rule reducer', function() {
    let fakeState = {};
    beforeEach(function () {
        fakeState = Object.assign({}, fake.fakeState);
    });
    it('should handle SELECT_RULE', function() {
        let testRes = mainReducer(fakeState,actions.selectRule("Button"));
        chai.expect(testRes.selectedRule).to.equal("Button")
    });
    it('should handle ADD_RULE', function() {
        let testRes = mainReducer(fakeState,actions.addRule("Button"));
        chai.expect(testRes.Rules.Button.length).to.equal(2)
    });
    it('should handle SHOW_RULE', function() {
        let testRes = mainReducer(fakeState,actions.showRule(1));
        chai.expect(testRes.ruleId).to.equal(1)
    });
    it('should handle EDIT_RULE', function() {
        fakeState.selectedRule = "Button"
        fakeState.ruleId = 1;
        let testRes = mainReducer(fakeState,actions.editRule(["Locator","type"], "css"));
        chai.expect(testRes.Rules["Button"][1]["Locator"]["type"]).to.equal("css")
    });
});