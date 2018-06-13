import { connect } from 'react-redux';
import { Rules } from '../../components/rule/rule.component';


const mapStateToProps = state => ({
   RulesDetails: state.RulesDetails
});

export default connect(mapStateToProps)(Rules);
