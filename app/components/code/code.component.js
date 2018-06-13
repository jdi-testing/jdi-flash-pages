import { ARROW } from '../../style/picsPath';

export class CodeComponent extends React.Component {

    getHeight() {
        const props = this.props;
        let page = props.PageObjects.find((page) => {
            if (page.pageId === props.activeTabPageId) {
                return page;
            }
        })
        return 20 * page.elements.length + 200;
    }

    render() {
        const props = this.props;
        return (
            <div className="codeContainer">
                <div className="code">
                    <textarea id="code-snippet" style={{ height: this.getHeight() }} value={props.code} readOnly={true}/>
                </div>
                <div className="details">
                    <button className="btn btn-default codeBtn" onClick={() => { props.downloadCode() }} style={{
                        visibility: !!props.code ? 'visible' : 'hidden' 
                    }} ><img src={ARROW} /></button>
                    {/* <div> */}
                    {/* {<button className="btn btn-default">Java</button> */}
                    {/* <button className="btn btn-default">C#</button> */}
                    {/* </div> */}
                    {/* <button className="btn btn-default codeBtn">Details</button> */}
                </div>
            </div>
        )
    }
}