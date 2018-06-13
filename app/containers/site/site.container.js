import { connect } from 'react-redux';
import { Site } from '../../components/site/site.component';

const mapStateToProps = state => ({
    SiteDetails: state.SiteDetails
});

export default connect(mapStateToProps)(Site);