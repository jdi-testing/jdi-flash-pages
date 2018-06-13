import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabsContainer from './containers/tabs.container';
import SiteContainer from './containers/site/site.container';
import PageContainer from './containers/page/page.container';
import RuleContainer from './containers/rule/rule.container';
import LogContainer from './containers/log/log.container';

export const Main = (props) => {
    return (
        <div className='start'>
            <TabsContainer />
            <div>
                <SiteContainer />
                <PageContainer />
                <RuleContainer />
            </div>
            <LogContainer />
        </div>
    )
}
