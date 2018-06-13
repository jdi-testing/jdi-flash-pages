import { Main } from './app';
import { store } from './store/store';
import { Provider } from "react-redux";
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store = { store }>
                <Component />
            </Provider>
        </AppContainer>
        , document.getElementById("app")
    );
};

render(Main);