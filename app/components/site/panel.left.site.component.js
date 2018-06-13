import { TRASH } from '../../style/picsPath'
import { Popup } from '../popup'

let clearValue = () => {
    $("#searchInput")[0].value = "";
}

export class PanelLeftSite extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            pageToDel: '',
            id: -1
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.applyDel = this.applyDel.bind(this);
    }

    togglePopup(pageName, pageId) {
        this.setState({
            showPopup: !this.state.showPopup,
            pageToDel: pageName || '',
            id: pageId             
        });
    }

    applyDel() {
       this.props.deletePage(this.state.id);
       this.togglePopup();
    }

    render() {
        const props = this.props;
        return (
            <div className="panel panel-default">
                { this.state.showPopup && 
                <Popup popupTitle={'Delete page'} 
                    popupText={`Would you like to delete ${this.state.pageToDel} ?`} 
                    closePopup={ this.togglePopup } 
                    saveAndClose={ this.applyDel } /> }
                <div className="panel-body leftContainer">
                    <div className="selectContainer">
                        <input type="text"
                            className="form-control searchInput"
                            placeholder="Search page"
                            id="searchInput"
                            onChange={(e) => {
                                let value = e.target.value;
                                props.searchPage(value)
                            }} />
                    </div>
                    <div>
                        <ul>
                            {
                                props.searchedPages.map((page, index) =>
                                    <li key={"page" + index}
                                        data-pageid={page.pageId} >
                                        <a onClick={() => { props.selectPage(page.pageId) }}
                                            className={(props.activeTabPageId === page.pageId) ? "selectPage" : ""}>
                                            {page.name} </a>
                                        <button className="img-on-btn btn btn-default"
                                            data-pageid={page.pageId}
                                            onClick={() => {
                                                clearValue();
                                                this.togglePopup(page.name, page.pageId);
                                            }}>
                                            <img src={TRASH} />
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <button className="btn btn-default addBtn"
                        onClick={() => { props.addPage() }}>Add page</button>
                </div>
            </div>
        )
    }
}

PanelLeftSite.propTypes = {
    searchedPages: PropTypes.array.isRequired,
    activeTabPageId: PropTypes.number.isRequired,
    searchPage: PropTypes.func.isRequired,
    selectPage: PropTypes.func.isRequired,
    addPage: PropTypes.func.isRequired,
    deletePage: PropTypes.func.isRequired
};