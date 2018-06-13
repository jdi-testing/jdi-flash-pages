import PanelLeftSiteContainer from '../../containers/site/panel.left.site.container';
import PanelRightSiteContainer from '../../containers/site/panel.right.site.container';

export class Site extends React.Component {
    render() {
        return ((this.props.SiteDetails) ?
            <div id="manage-site">
                <PanelLeftSiteContainer />
                <PanelRightSiteContainer />
            </div> : null)
    }
}
