const config = {
  message: 'abbababb aba babaab',
  alphabet: 'ab '
}

const app = {
  encoder: null,

  message: {
    text: null,
    cursor: null
  },

  step: () => {
    const code = app.encoder(app.message.text[app.message.cursor++])
    if (code === undefined)
      return
    console.log('*** decoder output', app.decoder(code))
  },

  reset: () => {
    app.message.cursor = 0
    app.prepareEncoder(config.alphabet)
    app.prepareDecoder(config.alphabet)
  },

  registerListeners: () => {
    document.addEventListener('keydown', e => {
      const arrowRight = 39
      const enter = 13

      if (e.keyCode === arrowRight) {
        app.step()
      } else if (e.keyCode === enter) {
        app.reset()
      }
    })
  },

  prepareEncoder: alphabet => {
    const memory = new Memory(
      (k, v) => console.log('encoder storing', k, v),
      (k, v) => console.log('encoder found', k, v),
      k => console.log('encoder: no value for', k)
    )

    app.encoder = getEncoder(alphabet, memory, buffer => {
      console.log('encoder buffer:', buffer)
    })
  },

  prepareDecoder: alphabet => {
    const memory = new Memory(
      (k, v) => console.log('decoder storing', k, v),
      (k, v) => console.log('decoder found', k, v),
      k => console.log('decoder: no value for', k)
    )

    app.decoder = getDecoder(alphabet, memory, buffer => {
      console.log('decoder buffer:', buffer)
    })
  },

  main: () => {
    app.message.text = config.message
    app.message.cursor = 0
    app.registerListeners()
    app.prepareEncoder(config.alphabet)
    app.prepareDecoder(config.alphabet)
  }
}

