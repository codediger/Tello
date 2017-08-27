import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'emotion/react';
import Cookies from 'cookies-js';
import PropTypes from 'prop-types';

import { userDataRequest } from '../../actions';
import { AUTH_TOKEN_KEY, ROW_HEIGHT } from '../../constants';

import Header from '../Header';
import RightModal from '../RightModal';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Spacer from '../Spacer';
import Backlog from '../Backlog';
import Home from '../Home';
import Login from '../Login';


// For our initial mount,
const token = Cookies.get(AUTH_TOKEN_KEY);

class App extends Component {
  static propTypes = {
    userDataRequest: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn, userDataRequest } = this.props;

    if (isLoggedIn) {
      userDataRequest();
    }
  }

  render() {
    return (
      <div>
        <Header />

        <RightModal />

        <Body>
          <Spacer size={ROW_HEIGHT} />

          <MaxWidthWrapper>
            <Route exact path="/" component={Backlog} />
            <Route path="/backlog" component={Backlog} />
            <Route path="/login" component={Login} />
          </MaxWidthWrapper>
        </Body>
      </div>
    );
  }
}

const Body = styled.div`
  position: relative;
  z-index: 1;
`

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { userDataRequest })(App);
