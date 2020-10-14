/*
 * Various helper functions
 *
 */

const utils = {
  html: {
    create: {
      p: text => {
        const p = document.createElement('p')
        p.innerText = text
        return p
      },

      fromTemplate: template => {
        const tmp = document.createElement('template')
        tmp.innerHTML = template
        return tmp.content.childNodes
      }
    }
  },

  leftPad: (str, len, fillValue) => {
    let padded = str

    while (padded.length < len) {
      padded = fillValue + padded
    }

    return padded
  },

  dec2binary: n => {
    let remainder = n
    let digits = ''

    while (remainder > 0) {
      digits = remainder % 2 + digits
      remainder = Math.floor(remainder / 2)
    }

    return utils.leftPad(digits, 5, 0)
  }
}
