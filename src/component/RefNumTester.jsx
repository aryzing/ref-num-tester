import React, { Component } from 'react'
import request from 'superagent'
import styles from './styles.css'
import travelportLogo from './Travelport_Logo.png'

export default class ReferenceNumberTester extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      password: '',
      refNumber: '',
      username: '',
      response: null,
    };

    this.onChangeRefNumber = this.onChangeRefNumber.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChangeRefNumber(e) {
    this.setState({refNumber: e.target.value});
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});

  }

  onChangePassword(e) {
    this.setState({password: e.target.value});

  }

  handleSubmit(e) {
    e.preventDefault()
    // use superagent to handle request and response
    const { password, refNumber, username } = this.state

    var xmlString = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
     <tem:GetTqOptionGroupFromRefNuber>
        <!--Optional:-->
        <tem:refNum>${this.state.refNumber}</tem:refNum>
     </tem:GetTqOptionGroupFromRefNuber>
  </soapenv:Body>
</soapenv:Envelope>
    `
    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(xmlString, "text/xml")

    var serializer = new XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDoc);
    console.log(xmlString)
    request
    .post('/api/somewhere')
    .set('Header-Username', username)
    .set('Header-Password', password)
    .type('xml')
    .send(xmlString)
    .end((err, res) => {
      if (err) {
        this.setState({
          error: err,
          response: res,
        })
        return
      }
        console.log(err)
        console.log(res)
        this.setState({
          error: null,
          response: 'test'
        })
      })
    console.log(this.state.value)
  }

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.headerLogo}>
          <img src={`/build/${travelportLogo}`}/>
        </div>
        <div>
          <h1 className={styles.title}>Reference Number Tester</h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.credentials}>
            <h2 className={styles.subheading}>Credentials</h2>
            <div className={styles.fieldTitle}>
              Reference Number
            </div>
            <input
              className={styles.field}
              name='refNumber'
              onChange={this.onChangeRefNumber}
            />
            <div className={styles.fieldTitle}>
              Username
            </div>
            <input
              className={styles.field}
              name='username'
              onChange={this.onChangeUsername}
            />
            <div className={styles.fieldTitle}>
              Password
            </div>
            <input
              className={styles.field}
              name='password'
              onChange={this.onChangePassword}
              type='password'
            />
            <div className={styles.enterpriseButton} onClick={this.handleSubmit}>
              Submit
            </div>
          </div>
          <div className={styles.response}>
            <h2 className={styles.subheading}>Server Response</h2>
            <div className={styles.serverContainer}>
              <pre className={styles.serverText}>{this.state.response || `The server response will appear here.`}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
