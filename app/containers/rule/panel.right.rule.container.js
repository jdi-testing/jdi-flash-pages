import { connect } from 'react-redux';
import { PanelRightRules } from '../../components/rule/panel.right.rule.component';
import { editRule, deleteRule, addRule, showRule } from '../../actions/rulesActions';

const mapStateToProps = state => ({
   selectedRule: state.selectedRule,
   CompositeRules: state.CompositeRules,
   ComplexRules: state.ComplexRules,
   SimpleRules: state.SimpleRules,
   ruleId: state.ruleId,
   ElementFields: state.ElementFields
});

export default connect(mapStateToProps,{
    editRule, deleteRule, addRule, showRule
})(PanelRightRules);
