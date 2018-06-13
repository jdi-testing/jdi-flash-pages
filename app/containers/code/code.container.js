import { connect } from 'react-redux';
import { CodeComponent } from '../../components/code/code.component';
import { downloadCode } from '../../actions/codeActions';

const mapStateToProps = (state) => ({
    PageObjects: state.PageObjects,
    activeTabPageId: state.activeTabPageId,
    code: state.code
})

export default connect(mapStateToProps,{
    downloadCode
})(CodeComponent);