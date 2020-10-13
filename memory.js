/*
 * Memory module for encoder and decoder.
 *
 * Stores new values together with an internal counter.
 * Takes callbacks upon construction that trigger during
 * storage and retrieval.
 *
 */

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
      this.storeCb(key, this.i)
    }
    this.lookup[key] = this.i
    this.i++
  }

  // register { current index: key }
  storeInverse (key) {
    if (this.storeCb) {
      this.storeCb(this.i, key)
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
