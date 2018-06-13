
export class LogComponent extends React.Component {
    getLog() {
        return this.props.warningLog.reverse();
    }
    render() {
        return (
            <div className="panel panel-default warningLog" style={{ visibility: this.props.warningLog.length ? 'visible' : 'hidden' }}>
                <div className="panel-heading">
                    <h3 className="panel-title">Warning Log</h3>
                </div>
                <div className="panel-body" style={{height: '150px', overflow: 'scroll'}}>
                    <ul style={{ listStyle: 'none' }}>
                        {this.getLog().map(function (log, i) {
                            return (<li key={"log" + i}>{log}</li>)
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}