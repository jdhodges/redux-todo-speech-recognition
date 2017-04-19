import _ from 'underscore'
import React, { Component } from 'react'
import Wit from 'wit-js'
import annyang from 'annyang'

export default class Interpreter extends Component {
  componentDidMount() {
    this.client = new Wit.Client({ apiToken: 'PIWW4YRGDGRETJXBRZIQQYQEBB5N42XR' })
    annyang.addCallback('result', (phrases) => {
      this.setState({ text: phrases[0] })
      this.submit(phrases[0])
    });
    annyang.start({continuous: false })
  }

  state = {
    text: ''
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.submit(text)
    }
  }

  submit = text => {
    this.client.message(text, {})
      .then(({ entities }) => {
        const mappedEntities = _.mapObject(entities, entity => entity[0].value)
        const action = this.props.actions[mappedEntities.intent]

        if (!action) {
          return Promise.reject(new Error('No intent detected'))
        }

        action(_.omit(mappedEntities, 'intent'));

        this.setState({ text: '' })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <input value={this.state.text} onChange={this.handleChange} onKeyDown={this.handleSubmit} />
    )
  }
}
