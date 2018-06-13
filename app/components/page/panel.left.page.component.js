import TreeContainer from '../../containers/page/page.tree.container';
import { GEAR } from '../../style/picsPath';
import { Popup } from '../popup';

export class PanelLeftPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showPopup: false
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.applyGen = this.applyGen.bind(this);
    }

    togglePopup(pageName, pageId) {
        this.setState({
            showPopup: !this.state.showPopup          
        });
    }

    applyGen() {
       this.props.generateElements();
       this.togglePopup();
    }

    checkElemnets(){
        const props = this.props;
        let page = props.PageObjects.find(page => page.pageId === props.activeTabPageId);
        if(!!page.elements.length){
            this.setState({
                showPopup: true
            })
        } else {
            props.generateElements();
        }
    }

    render() {
        const props = this.props;
        return (
            <div className="panel panel-default">
                <button id='refresh' onClick={()=>{ props.refresh(); }}></button>
                {this.state.showPopup &&
                    <Popup popupTitle={'Generate new elments'}
                        popupText={`All defined elements of this page page will be replaced. Are you sure?`}
                        closePopup={this.togglePopup}
                        saveAndClose={this.applyGen} />}
                <div className="panel-body leftContainer">
                    <div className="selectContainer topContainer">
                        <input type="text"
                            className="form-control searchInput"
                            placeholder="Search element"
                            id="searchInput"
                            onChange={(e) => {
                                let value = e.target.value;
                                props.searchElement(value)
                            }} />
                        <button className="btn btn-default" onClick={() => { this.checkElemnets() }}>Generate PO</button>
                        <button className="btn btn-default" onClick={() => { props.genCode() }}>Generate code</button>
                        <button className="btn btn-default" onClick={() => { props.openRules() }}><img src={GEAR} /></button>
                    </div>
                    <div className="selectContainer">
                        <button className="btn btn-default addBtn"
                            onClick={() => {
                                props.addElement(null)
                            }}>Add element
                        </button>
                    </div>
                    <div>
                        <TreeContainer />
                    </div>
                </div>
            </div>
        )
    }
}

PanelLeftPage.propTypes = {
    searchElement: PropTypes.func.isRequired,
    generateElements: PropTypes.func.isRequired,
    genCode: PropTypes.func.isRequired,
    openRules: PropTypes.func.isRequired,
    addElement: PropTypes.func.isRequired,
    PageObjects: PropTypes.array.isRequired,
    activeTabPageId: PropTypes.number.isRequired
}
