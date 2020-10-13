class Memory {
  constructor (storeCb, hitCb, missCb) {
    this.storeCb = storeCb
    this.missCb = missCb
    this.hitCb = hitCb
    this.lookup = {}
    this.i = 0
  }

  // register { key: current index }
  store (key) {
    if (this.storeCb) {
      this.storeCb[key, this.i]
    }
    this.lookup[key] = this.i
    this.i++
  }

  // register { current index: key }
  storeInverse (key) {
    if (this.storeCb) {
      this.storeCb[key, this.i]
    }
    this.lookup[this.i] = key
    this.i++
  }

  find (key) {
    const val = this.lookup[key]

    if (val === undefined) {
      if (this.missCb) this.missCb(key)
    } else {
      if (this.hitCb) this.hitCb(key, val)
    }

    return val
  }
}

const getEncoder = (alphabet, memory, bufferCb) => {
  let buffer = ''

  for (let symbol of alphabet) {
    memory.store(symbol)
  }

  const setBuffer = value => {
    if (bufferCb) bufferCb(value)
    buffer = value
  }

  return symbol => {
    if (!buffer) return setBuffer(symbol)
    if (symbol === '.') return memory.find(buffer)

    const candidate = buffer + symbol

    if (memory.find(candidate) !== undefined) {
      return setBuffer(candidate)
    }

    const code = memory.find(buffer)
    memory.store(candidate)
    setBuffer(symbol)
    return code
  }
}

const getDecoder = (alphabet, memory, bufferCb) => {
  let buffer = ''

  for (let letter of alphabet) {
    memory.storeInverse(letter)
  }

  const setBuffer = value => {
    if (bufferCb) bufferCb(value)
    buffer = value
  }

  return code => {
    if (!buffer) {
      setBuffer(memory.find(code))
      return buffer
    }

    const entry = memory.find(code) === undefined
      ? buffer + buffer[0]
      : memory.find(code)

    memory.storeInverse(buffer + entry[0])
    setBuffer(entry)
    return entry
  }
}

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
    //console.log('encoder output', code)
    console.log('decoder output', app.decoder(code))
  },

  reset: () => {
    console.log('resetting')
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

  prepareEncoder: () => {
    app.encoder = getEncoder(
      config.alphabet,
      new Memory(
        (k, v) => console.log('encoder storing', k, v),
        (k, v) => console.log('encoder found', k, v),
        k => console.log('encoder: no value for', k)
      ),
      buffer => console.log('encoder buffer:', buffer)
    )
  },

  prepareDecoder: () => {
    app.decoder = getDecoder(
      config.alphabet,
      new Memory(
        (k, v) => console.log('decoder storing', k, v),
        (k, v) => console.log('decoder found', k, v),
        k => console.log('decoder: no value for', k)
      ),
      buffer => console.log('decoder buffer:', buffer)
    )
  },

  main: () => {
    app.message.text = config.message
    app.message.cursor = 0
    app.registerListeners()
    app.prepareEncoder()
    app.prepareDecoder()
  }
}

