import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { ToastContainer, ToastStore } from "react-toasts";
import Error from "../../errors/Errors";
import { login } from '../../../actions/UserActions';
import { connect } from 'react-redux';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    this.setState({
      error: nextProp.errors
    })
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const loginData = {
      email: this.state.username,
      password: this.state.password
    };
    this.props.login(loginData, this.props.history);
  };




  render() {
    var error = "";
    if (this.props.errors) {
      error = <Error error={this.props.errors} />;
    }
    return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                {error}
                <ToastContainer
                  position={ToastContainer.POSITION.TOP_RIGHT}
                  store={ToastStore}
                />
                  <CForm onSubmit={this.onSubmit} autoComplete="off">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          @
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email"
                       size="lg"
                        placeholder="Email Id"
                        onChange={this.onChange}
                      value={this.state.username}
                      name="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                      type="password"
                      placeholder="Password"

                      onChange={this.onChange}
                      value={this.state.password}
                      name="password"
                      size="lg"/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" disabled={(this.state.password && this.state.username) ? false : true} color="primary" className="px-4" size="lg">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      <Link to="/register">
                        <CButton color="link" className="px-0">Don't have account?</CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
   );
  }
}
const mapStateToProps = state => ({
  errors: state.errors.error
});

export default connect(mapStateToProps, { login })(Login);
