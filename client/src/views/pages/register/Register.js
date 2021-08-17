import React, {Component} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { ToastContainer, ToastStore } from "react-toasts";
import Error from "../../errors/Errors";
import { register } from '../../../actions/UserActions';
import { connect } from 'react-redux';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      cPassword: '',
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
    if(this.state.password !== this.state.cPassword)
    {
      ToastStore.warning("Password Mismatched")
    }
    else{
      const reqData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      console.log("Form Data===>>>", reqData);
      this.props.register(reqData, this.props.history);
    }
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
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
              {error}
                <ToastContainer
                  position={ToastContainer.POSITION.TOP_RIGHT}
                  store={ToastStore}
                />
                <CForm onSubmit={this.onSubmit} autoComplete="off">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Full Name"
                     value={this.state.name}
                     onChange={this.onChange}
                     maxLength="30"
                     name="name"
                     size="lg" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Email"
                    onChange={this.onChange}
                      value={this.state.email}
                      name="email"
                      size="lg"/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
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
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat Password"
                      onChange={this.onChange}
                      value={this.state.cPassword}
                      name="cPassword"
                      size="lg"/>
                  </CInputGroup>
                  <CButton
                  type="submit"
                  disabled={(this.state.password && this.state.name && this.state.cPassword && this.state.email) ? false : true}
                  size="lg" color="success" block>Create Account</CButton>
                  <CRow>
                  <CCol xs="12" className="text-right">
                      <Link to="/">
                        <CButton color="link" className="px-0">Back to Login</CButton>
                        </Link>
                      </CCol>
                      </CRow>
                </CForm>
              </CCardBody>

            </CCard>
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

export default connect(mapStateToProps, { register })(Register);
