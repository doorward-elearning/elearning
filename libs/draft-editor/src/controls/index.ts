import inline from './Inline';
import blockType from './BlockType';
import fontSize from './FontSize';
import fontFamily from './FontFamily';
import list from './List';
import textAlign from './TextAlign';
import colorPicker from './ColorPicker';
import link from './Link';
import embedded from './Embedded';
import emoji from './Emoji';
import image from './Image';
import remove from './Remove';
import fullScreen from './FullScreen';
import history from './History';
import equation from './Equation';

export default {
  inline,
  blockType,
  fontSize,
  fontFamily,
  list,
  textAlign,
  textColorPicker: colorPicker('color'),
  bgColorPicker: colorPicker('bgcolor'),
  link,
  embedded,
  emoji,
  image,
  remove,
  history,
  fullScreen,
  equation,
};
