import { connect } from 'react-redux';
import { PanelRightSite } from '../../components/site/panel.right.site.component';
import { editValue, closePage } from '../../actions/siteActions';

const mapStateToProps = state => ({
    selectedPage: state.selectedPage,
    activeTabPageId: state.activeTabPageId,
    SiteInfo: state.SiteInfo
});

export default connect(mapStateToProps, {editValue, closePage})(PanelRightSite);
