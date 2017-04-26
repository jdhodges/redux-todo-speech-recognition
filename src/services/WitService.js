import _ from 'underscore'
import * as actions from '../actions'
import Wit from 'wit-js'

class WitService {
  constructor(store, voiceRecognitionService) {
    this.store = store
    this.voiceRecognitionService = voiceRecognitionService
    this.client = new Wit.Client({ apiToken: 'PIWW4YRGDGRETJXBRZIQQYQEBB5N42XR' })
  }

  start() {
    this.voiceRecognitionService.addListener(text => this.message(text))
  }

  message(text) {
    return this.client.message(text, {})
      .then(({ entities }) => {
        const mappedEntities = _.mapObject(entities, entity => entity[0].value)
        const action = actions[mappedEntities.intent]

        if (!action) {
          return Promise.reject(new Error('No intent detected'))
        }

        this.store.dispatch(action(_.omit(mappedEntities, 'intent')))
      })
      .catch(err => console.error(err))
  }
}

export default WitService;
