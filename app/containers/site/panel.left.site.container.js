import { connect } from 'react-redux';
import { PanelLeftSite } from '../../components/site/panel.left.site.component';
import { 
    searchPage, 
    selectPage, 
    deletePage, 
    addPage } from '../../actions/siteActions';

const mapStateToProps = state => ({
    searchedPages: state.searchedPages,
    activeTabPageId: state.activeTabPageId
});

export default connect(mapStateToProps, {searchPage, selectPage, deletePage, addPage})(PanelLeftSite);
