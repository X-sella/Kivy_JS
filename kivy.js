import * as Core from './core/index.js';
import * as Widgets from './widgets/index.js';
import * as Layouts from './layouts/index.js';
import * as Behaviors from './behaviors/index.js';
import * as Utils from './utils/index.js';
import * as Styles from './styles/index.js';

window.Kivy = {
  ...Core,
  ...Widgets,
  ...Layouts,
  ...Behaviors,
  ...Utils,
  ...Styles,
  Styles
};
