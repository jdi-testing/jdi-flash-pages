import { connect } from 'react-redux';
import { PanelRightPage } from '../../components/page/panel.right.page.component';
import { editElement } from '../../actions/pageActions';
import { showCode } from '../../actions/codeActions';

const mapStateToProps = (state) => ({
    selectedElement: state.selectedElement,
    ElementFields: state.ElementFields,
    CompositeRules: state.CompositeRules
})

export default connect(mapStateToProps, { editElement, showCode })(PanelRightPage);