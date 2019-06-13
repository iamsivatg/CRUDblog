import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import 'antd/dist/antd.css';
import CustomLayout from './containers/layout';
import BaseRouter from './routes';
import * as action from './store/actions/auth';



class App extends Component{

  componentDidMount() {
    this.props.OnTryAutoSignup();
  }
 

  render() {
    return (
      <div >
      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter />
        </CustomLayout>
       </Router> 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    OnTryAutoSignup: () => dispatch(action.authCheckState())
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App); 