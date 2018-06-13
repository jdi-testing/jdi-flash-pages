import PanelLeftPageContainer from '../../containers/page/panel.left.page.container';
import PanelRightPageContainer from '../../containers/page/panel.right.page.container';
import CodeContainer from '../../containers/code/code.container'

export class Page extends React.Component {
    render() {
        return (this.props.ElementsDetails ?
            <div id="manage-site">
                <PanelLeftPageContainer />
                <div className="panel panel-default">
                    <div className="panel-body">
                        {/* <input id="smallInvisibleInput" /> */}
                        { !!this.props.selectedElement && !this.props.CodeDetails && <PanelRightPageContainer /> }
                        { this.props.CodeDetails && <CodeContainer /> }
                    </div>
                </div>
            </div> : null)
    }
}
