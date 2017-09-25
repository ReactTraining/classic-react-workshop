const mouseFile = require('./images/mouse.png')
const catFile = require('./images/cat.jpg')

export const container = {
  height: '100%',
  cursor: `url(${mouseFile}), auto`
}

export const cat = {
  position: 'absolute',
  backgroundImage: `url(${catFile})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 0',
  width: 100,
  height: 100,
  cursor: `url(${mouseFile}), auto`
}
