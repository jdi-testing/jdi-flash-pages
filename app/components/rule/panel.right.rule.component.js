import { ADD, TRASH } from '../../style/picsPath';

export class PanelRightRules extends React.Component {
    getChosenRules() {
        const props = this.props;
        return props.CompositeRules[props.selectedRule] || props.ComplexRules[props.selectedRule] || props.SimpleRules[props.selectedRule] || [];
    }
    getElementRule() {
        const props = this.props;
        return this.getChosenRules().find(rule => rule.id === props.ruleId) || {};
    }
    getVisibleRules() {
        const props = this.props;
        let selectedRule = props.selectedRule;
        let elementFields = !!selectedRule ? props.ElementFields[selectedRule] : {};
        let allFields = Object.keys(this.getElementRule());
        return allFields.filter(field => elementFields[field] === "TextField" || field === "uniqness") || [];
    }
    render() {
        const props = this.props;
        let selectedRule = props.selectedRule;
        let ruleId = props.ruleId;
        let rulesArray = this.getChosenRules();
        let visibleRules = this.getVisibleRules();
        let elementRule = this.getElementRule();
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="topContainer">
                        <ul className="nav nav-tabs">
                            {
                                rulesArray.map(function (rule, index) {
                                    let ruleName = "Rule " + (++index);
                                    return (
                                        <li key={ruleName}>
                                            <a href="#" className={(rule.id === ruleId) ? "active" : ""}
                                                onClick={() => { props.showRule(rule.id) }}>{ruleName}
                                            </a>
                                            <button className='btnWithoutPM' onClick={() => { props.deleteRule(rule.id) }}>
                                                <img src={TRASH} />
                                            </button>
                                        </li>
                                    )
                                })
                            }
                            {!!rulesArray.length && <li>
                                <a onClick={() => { props.addRule(selectedRule) }} ><img src={ADD} /> Add rule</a>
                            </li>}
                        </ul>
                    </div>
                    <div>
                        {
                            visibleRules.map(function (rule, index) {
                                return (<div key={"rule-" + index} className="selectContainer">
                                    <label>
                                        <span>{rule}: </span>
                                        <input
                                            type="text"
                                            className="form-control pageSetting"
                                            onChange={(e) => { let value = e.target.value; props.editRule(rule, value) }}
                                            value={elementRule[rule]} />
                                    </label>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>)
    }
}
