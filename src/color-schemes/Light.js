import {Palette as palette} from './Palette';

const searchBar = {
  background: palette.white_blue,
  color: palette.blue,
  input: palette.light_blue,
};

const statusBar = {
  main: palette.blue,
  background: palette.light_blue,
  alternative: palette.dark_blue,
};

export const lightTheme = {
  main: palette.blue,
  background: palette.light_blue,
  alternative: palette.white_blue,
  trackCardGradient: palette.gradient_blue,
  reviewCardGradient: palette.white_blue,
  reviewCardTitle: palette.dark_blue,
  placeholderColor: palette.midd_blue,
  main_font: palette.light_blue,
  second_font: palette.blue,
  empty_star_color: palette.blue,
  copy_right: palette.black,
  search_bar: searchBar,
  status_bar: statusBar,
};
