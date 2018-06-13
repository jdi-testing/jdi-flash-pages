import { connect } from 'react-redux';
import { LogComponent } from '../../components/log/log.component';

const mapStateToProps = (state) => ({
    warningLog: state.warningLog
})

export default connect(mapStateToProps)(LogComponent);