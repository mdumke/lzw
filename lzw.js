/*
 * Encoder and Decoder logic for Lempel-Ziv-Welch compression.
 *
 * Both require a memory module as defined in memory.js. Optional
 * callback is triggered whenever the buffer state changes.
 */

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
