const config = {
  message: 'abaabbbba abaaab abababbbaabababb abab.',
  alphabet: 'ab ',
  memorySize: 32
}

const app = {
  encoder: null,

  message: {
    text: null,
    cursor: null
  },

  step: () => {
    display.info.clear()
    display.memory.removeHighlights()
    display.code.clear()

    if (app.message.cursor >= app.message.text.length) {
      display.info.set('Press Enter to Reset')
      display.buffer.clearAll()
      return
    }

    const code = app.encoder(app.message.text[app.message.cursor])
    display.message.highlight(app.message.cursor)
    app.message.cursor++;

    if (code === undefined) {
      return
    }

    display.code.show(utils.dec2binary(code))
    display.output.append('encoder', utils.dec2binary(code))
    display.output.append('decoder', app.decoder(code))
  },

  reset: () => {
    app.message.cursor = 0
    display.init(app.message.text)
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
      display.memory.store('encoder'),
      display.memory.highlight('encoder')
    )

    app.encoder = getEncoder(alphabet, memory, buffer => {
      display.buffer.set('encoder', buffer)
    })
  },

  prepareDecoder: alphabet => {
    const memory = new Memory(
      display.memory.store('decoder')
    )

    app.decoder = getDecoder(alphabet, memory, buffer => {
      display.buffer.set('decoder', buffer)
    })
  },

  main: () => {
    app.message.text = config.message
    app.message.cursor = 0
    display.init(config.message)
    app.registerListeners()
    app.prepareEncoder(config.alphabet)
    app.prepareDecoder(config.alphabet)
  }
}

