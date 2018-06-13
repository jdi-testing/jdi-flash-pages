/*import {PanelLeftRules, PanelRightRules} from './manageRules';

export function Rules(props) {
    let state = props.state;
    let store = props.store;
    return (
        (state.rulesSettings) ?
            <div id="manage-site">
                <PanelLeftRules state={state} store={store} />
                <PanelRightRules state={state} store={store} />
            </div> : null
    )
}*/

import PanelLeftRulesContainer from '../../containers/rule/panel.left.rule.container';
import PanelRightRulesContainer from '../../containers/rule/panel.right.rule.container';


export class Rules extends React.Component {
    render() {
        return (
            (this.props.RulesDetails) ?
                <div id="manage-site">
                    <PanelLeftRulesContainer />
                    <PanelRightRulesContainer />
                </div> : null
        )
    }
}