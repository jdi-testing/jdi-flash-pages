import { ARROW, ADD, JDI, SELENIUM } from '../style/picsPath'
import { prototype } from 'events';
import { Popup } from './popup';

export class Tabs extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.applyNewMode = this.applyNewMode.bind(this);
    }

    togglePopup(pageName, pageId) {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    applyNewMode() {
        this.props.switchCodeMode();
        this.togglePopup();
    }

    checkMode() {
        this.setState({
            showPopup: true
        })
    }
    render() {
        const props = this.props;
        const mode = props.JDI ? ' Selenium Web elements ' : ' JDI elements '
        return (
            <div className="topContainer">
                {this.state.showPopup &&
                    <Popup popupTitle={`Select ${mode} mode`}
                        popupText={`Switching mode may remove defined elements and pages. Are you sure?`}
                        closePopup={this.togglePopup}
                        saveAndClose={this.applyNewMode} />}
                <ul className="nav nav-tabs ">
                    {
                        props.PageObjects.map(function (tabPage) {
                            let tabPageName = tabPage.name || "Page " + (tabPage.pageId + 1);
                            return (
                                <li key={tabPage.pageId} onClick={() => { props.showPage(tabPage.pageId) }}>
                                    <a href="#" data-tabid={tabPage.pageId}
                                        className={((tabPage.pageId === props.activeTabPageId) && !props.settingsForSite)
                                            ? "shortText active"
                                            : "shortText"}>
                                        {tabPageName}
                                    </a>
                                </li>
                            )
                        })
                    }
                    <li onClick={() => { props.addPage() }}>
                        <a href="#" id="add-tab-page">
                            <img src={ADD} /> Add page
                        </a>
                    </li>
                </ul>
                <div>
                    <button className="btn btn-default JDI" onClick={() => { this.checkMode() }}>
                        <img src={props.JDI ? SELENIUM : JDI} />
                    </button>
                    <button className="btn btn-default" onClick={() => { props.zipAllCode() }} disabled={!props.JDI}>
                        <img src={ARROW} />
                    </button>
                    <button className="btn btn-default" onClick={() => { props.backToSite() }}>
                        Back to Site
                    </button>
                    {/* <button className="btn btn-default"><img src={'../bootstrap/pics/gear.png'} /></button> */}
                </div>
            </div>
        )
    }
}

Tabs.propTypes = {
    PageObjects: PropTypes.array.isRequired,
    activeTabPageId: PropTypes.number.isRequired,
    showPage: PropTypes.func.isRequired,
    addPage: PropTypes.func.isRequired,
    settingsForSite: PropTypes.bool.isRequired,
    zipAllCode: PropTypes.func.isRequired,
    backToSite: PropTypes.func.isRequired
};
