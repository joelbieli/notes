import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        authToken: state.authToken
    };
};

class ProtectedRouteComponent extends Component {
    render() {
        return (
            <Route
                exact
                path={this.props.path}
                render={() => this.props.authToken ? <this.props.component/> : <Redirect to={'/auth'}/>}/>);
    }
}

ProtectedRouteComponent.propTypes = {
    component: PropTypes.instanceOf(Component).isRequired,
    path: PropTypes.string.isRequired
};

const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);

export default ProtectedRoute;