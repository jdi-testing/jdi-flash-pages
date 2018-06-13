export class PanelRightSite extends React.Component {
    render() {
        let props = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {props.activeTabPageId === -1 && <div>
                        <div className="selectContainer">
                            <span>Name: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                defaultValue={props.SiteInfo.siteTitle}
                                placeholder="Application name"
                                onBlur={(e) => { let value = e.target.value; props.editValue(["SiteInfo", "siteTitle"], value) }} />
                        </div>
                        <div className="selectContainer">
                            <span>Domain: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                defaultValue={props.SiteInfo.domainName}
                                placeholder="Domain name"
                                onBlur={(e) => { let value = e.target.value; props.editValue(["SiteInfo", "domainName"], value) }} />
                        </div>
                    </div>}
                    {props.activeTabPageId > -1 && <div className = 'siteRightPanel'>
                    <div>
                        <div className="selectContainer">
                            <span>Name: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                value={props.selectedPage.name}
                                placeholder="Page name"
                                onChange={(e) => { let value = e.target.value; props.editValue(["name"], value) }} />
                        </div>
                        <div className="selectContainer">
                            <span>Title: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                value={props.selectedPage.title}
                                placeholder="Title"
                                onChange={(e) => { let value = e.target.value; props.editValue(["title"], value) }} />
                            <select className="form-control pageSettingCombo"
                                value={props.selectedPage.titleMatch}
                                onChange={(e) => { let value = e.target.value; props.editValue(["titleMatch"], value) }}>
                                <option value="Equals">Equals</option>
                                <option value="Contains">Contains</option>
                                <option value="Not contains">Not contains</option>
                            </select>
                        </div>
                        <div className="selectContainer">
                            <span>Url: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                value={props.selectedPage.url}
                                placeholder="Page url"
                                onChange={(e) => { let value = e.target.value; props.editValue(["url"], value) }} />
                            <select className="form-control pageSettingCombo"
                                value={props.selectedPage.urlMatch}
                                onChange={(e) => { let value = e.target.value; props.editValue(["urlMatch"], value) }}>
                                <option value="Equals">Equals</option>
                                <option value="Contains">Contains</option>
                                <option value="Not contains">Not contains</option>
                            </select>
                        </div>
                        <div className="selectContainer">
                            <span>Url template: </span>
                            <input type="text"
                                className="form-control pageSetting"
                                value={props.selectedPage.urlTemplate}
                                placeholder="Url template"
                                onChange={(e) => { let value = e.target.value; props.editValue(["urlTemplate"], value) }} />
                        </div>
                    </div>
                    <button className="btn btn-default" style={{alignSelf: 'flex-start'}}
                        onClick={() => { props.closePage() }}>X
                    </button>
                    </div>}
                </div>
            </div>
        )
    }
}

PanelRightSite.propTypes = {
    SiteInfo: PropTypes.object.isRequired,
    selectedPage: PropTypes.object.isRequired,
    activeTabPageId: PropTypes.number.isRequired,
    editValue: PropTypes.func.isRequired,
    closePage: PropTypes.func.isRequired
};