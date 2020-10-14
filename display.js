/*
 * Manipulation of HTML elements
 *
 */

const display = {
  init: message => {
    display.message.set(message)
    display.memory.draw('encoder', document.querySelector('#encoder__memory'))
    display.memory.draw('decoder', document.querySelector('#decoder__memory'))
    display.buffer.set('encoder', '')
    display.buffer.set('decoder', '')
    display.output.clear()
    display.info.set('Right Arrow Key: Step')
  },

  info: {
    clear: () => {
      document.querySelector('#info').innerText = ''
    },

    set: text => {
      document.querySelector('#info').innerText = text
    }
  },

  buffer: {
    set: (type, value) => {
      const content = value === undefined
        ? ''
        : value

      document.querySelector(`#${type}__buffer`).innerText =
        content.replace(/ /g, '_')
    }
  },

  memory: {
    draw: (type, el) => {
      const n = config.memorySize;
      el.innerHTML = ''

      for (let i = 0; i < n / 2; i++) {
        el.appendChild(display.memory.createRow(i, n, type))
      }
    },

    createRow: (i, memorySize, type) => {
      const template = `<tr>
          <td id="${type}__memoryaddress--${i}">
            ${utils.dec2binary(i)}
          </td>
          <td id="${type}__memory--${i}"></td>
          <td id="${type}__memoryaddress--${i}">
            ${utils.dec2binary(i + memorySize / 2)}
          </td>
          <td id="${type}__memory--${i + memorySize / 2}"></td>
        </tr>
      `
      return utils.html.create.fromTemplate(template)[0]
    },

    store: type => (k, v) => {
      const addr = type === 'encoder' ? v : k
      const content = type === 'encoder' ? k : v

      document.querySelector(`#${type}__memory--${addr}`).innerText = content
    },

    highlight: type => (k, v) => {
      const addr = type === 'encoder' ? v : k

      document.querySelector(`#${type}__memory--${addr}`)
        .classList.add('highlight')
    },

    removeHighlights: () => {
      document.querySelectorAll('#encoder__memory td').forEach(el => {
        el.classList.remove('highlight')
      })

      document.querySelectorAll('#decoder__memory td').forEach(el => {
        el.classList.remove('highlight')
      })
    }
  },

  message: {
    set: text => {
      const el = document.querySelector('#message')
      el.innerHTML = ''

      text.split('').forEach(letter => {
        el.appendChild(utils.html.create.p(letter))
      })
    },

    highlight: i => {
      const el = document.querySelector('#message')

      document.querySelectorAll('#message p').forEach(el => {
        el.classList.remove('highlight')
      })

      el.children[i].classList.add('highlight')
    }
  },

  output: {
    append: (type, data) => {
      document.querySelector(`#${type}__output`).innerText +=
        data.replace(/ /g, '_')
    },

    clear: () => {
      document.querySelector('#encoder__output').innerText = ''
      document.querySelector('#decoder__output').innerText = ''
    }
  },

  code: {
    show: bits => {
      document.querySelector('#code').innerText = bits
    },

    clear: () => {
      document.querySelector('#code').innerText = ''
    }
  }
}

