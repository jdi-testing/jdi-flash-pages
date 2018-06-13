import { connect } from 'react-redux';
import { Page } from '../../components/page/page.component';

const mapStateToProps = state => ({
    ElementsDetails: state.ElementsDetails,
    selectedElement: state.selectedElement,
    CodeDetails: state.CodeDetails
});

export default connect(mapStateToProps)(Page);