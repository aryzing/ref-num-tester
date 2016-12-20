import React, { Component } from 'react'
import styles from './styles.css'
import travelportLogo from './Travelport_Logo.png'

export default class ReferenceNumberTester extends Component {
  constructor() {
    super()
    this.state = {
      response: 'mock server response'
    }
  }
  render() {
    return (
      <div className='component'>
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
            <input className={styles.field} />
            <div className={styles.fieldTitle}>
              Username
            </div>
            <input className={styles.field} />
            <div className={styles.fieldTitle}>
              Password
            </div>
            <input className={styles.field} type='password' />
            <div className={styles.enterpriseButton} onClick={this.handleSubmit}>
              Submit
            </div>
          </div>
          <div className={styles.response}>
            <h2 className={styles.subheading}>Server Response</h2>
            <div className={styles.serverContainer}>
              <pre className={styles.serverText}>{this.state.response}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
