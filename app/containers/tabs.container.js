import { connect } from 'react-redux';
import { Tabs } from '../components/tabs.component';
import { showPage } from '../actions/pageActions';
import { zipAllCode, switchCodeMode } from '../actions/codeActions';
import { backToSite, addPage } from '../actions/siteActions';

const mapStateToProps = state => ({
    PageObjects: state.PageObjects,
    activeTabPageId: state.activeTabPageId,
    settingsForSite: state.settingsForSite,
    JDI: state.JDI
});

export default connect(mapStateToProps, { showPage, zipAllCode, backToSite, addPage, switchCodeMode })(Tabs);