import {Palette as palette} from './Palette';

const searchBar = {
  background: palette.white_grey,
  color: palette.black,
  input: palette.grey,
};

const statusBar = {
  main: palette.black,
  background: palette.dark_grey,
  alternative: palette.black,
};

export const darkTheme = {
  type: 'dark',
  keyboard_color: 'dark',

  main: palette.black,
  background: palette.dark_grey,
  alternative: palette.white_grey,
  trackCardGradient: palette.black,
  reviewCardGradient: palette.white_grey,
  reviewCardTitle: palette.white_grey,
  placeholderColor: palette.grey,
  main_font: palette.light_grey,
  second_font: palette.light_grey,
  empty_star_color: palette.white_grey,
  copy_right: palette.white,
  search_bar: searchBar,
  status_bar: statusBar,
};
