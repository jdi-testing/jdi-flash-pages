import { connect } from 'react-redux';
import { PanelLeftPage } from '../../components/page/panel.left.page.component';
import { searchElement, generateElements, addElement } from '../../actions/pageActions';
import { genCode } from '../../actions/codeActions';
import { openRules,refresh } from '../../actions/rulesActions'; 

const mapStateToProps = state => ({
   PageObjects: state.PageObjects,
   activeTabPageId: state.activeTabPageId
});

export default connect(mapStateToProps,{
    searchElement,
    generateElements,
    addElement,
    openRules,
    genCode,
    refresh
})(PanelLeftPage);
