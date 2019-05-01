import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {loadJWT} from "../redux/actions";

const mapStateToProps = state => {
    return {
        authToken: state.authToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadJWT: () => dispatch(loadJWT())
    };
};

class ProtectedRouteComponent extends Component {
    componentWillMount() {
        this.props.loadJWT();
    }

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

const ProtectedRoute = connect(mapStateToProps, mapDispatchToProps)(ProtectedRouteComponent);

export default ProtectedRoute;