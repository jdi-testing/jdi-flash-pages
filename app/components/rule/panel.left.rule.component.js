import ReactFileReader from 'react-file-reader';
import { ARROW, ARROWUP, TRASH } from '../../style/picsPath';
import { SimpleRules, ComplexRules } from '../../data/settings';

export class PanelLeftRules extends React.Component {
    getRulesList() {
        return [...Object.keys(this.props.SimpleRules), ...Object.keys(this.props.ComplexRules), ...Object.keys(this.props.CompositeRules)];
    }
    render() {
        const props = this.props;
        let rulesList = this.getRulesList();
        return (
            <div className="panel panel-default">
                <div className="panel-body leftContainer">
                    <div style={{ display: 'flex' }}>
                        <button className="btn btn-default" onClick={() => { props.exportRules() }}>
                            <img src={ARROW} />
                            Export rules
                            </button>
                        <ReactFileReader handleFiles={files => { props.importRules(files); }} fileTypes={[".json"]} multipleFiles={true}>
                            <button className='btn btn-default'>
                                <img src={ARROWUP} /> Import rules
                            </button>
                        </ReactFileReader>
                            <button id='refresh' onClick={()=>{ props.refresh(); }}></button>
                    </div>
                    <div>
                        <ul>
                            {
                                rulesList.map(function (element, index) {
                                    return (<li key={"element-" + index}>
                                        <a onClick={() => { props.selectRule(element) }}
                                            className={(props.selectedRule === element) ? "selectPage" : ""}>{element}</a>
                                        <button className="img-on-btn btn btn-default"
                                            onClick={() => {
                                                props.removeRulesGroup(element)
                                            }}>
                                            <img src={TRASH} />
                                        </button>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
