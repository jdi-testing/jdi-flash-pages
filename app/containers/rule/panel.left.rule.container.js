import { connect } from 'react-redux';
import { PanelLeftRules } from '../../components/rule/panel.left.rule.component';
import { selectRule, importRules, exportRules, removeRulesGroup, refresh } from '../../actions/rulesActions';
import { genCode } from '../../actions/codeActions';
import { openRules } from '../../actions/rulesActions'; 

const mapStateToProps = state => ({
   selectedRule: state.selectedRule,
   CompositeRules: state.CompositeRules,
   ComplexRules: state.ComplexRules,
   SimpleRules: state.SimpleRules
});

export default connect(mapStateToProps,{
    selectRule, importRules, exportRules, removeRulesGroup, refresh
})(PanelLeftRules);
