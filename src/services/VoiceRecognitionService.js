import _ from 'underscore'
import annyang from 'annyang'

class VoiceRecognitionService {
  constructor() {
    annyang.start({ continuous: false })
  }

  addListener(listener) {
    annyang.addCallback('result', (phrases) => {
      listener(phrases[0])
    })
  }
}

export default VoiceRecognitionService;
