import { connect } from 'react-redux';
import { Tree } from '../../components/page/tree.component';
import { changeTree, addElement, deleteElement, selectElement } from '../../actions/pageActions';

const mapStateToProps = (state) => ({
    resultTree: state.resultTree
})

export default connect(mapStateToProps,{
    changeTree,
    addElement,
    deleteElement,
    selectElement
})(Tree);