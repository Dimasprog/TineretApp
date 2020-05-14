const palette = {
  // Dark Theme
  black: '#000000',
  dark_grey: '#333333',
  grey: '#686868',
  white_grey: '#b3b3b3',
  light_grey: '#d9d9d9',
  // Base Theme
  dark_blue: '#003366',
  blue: '#004080',
  gradient_blue: '#0059b3',
  midd_blue: '#66b3ff',
  light_blue: '#99ccff',
  white_blue: '#cce6ff',
  // Other Colors
  white: '#ffffff',
};

const searchBarDarkTheme = {
  background: palette.light_grey,
  color: palette.black,
  input: palette.grey,
};

const statusBarDarkTheme = {
  font_color: 'light-content',
  main: palette.black,
  background: palette.dark_grey,
  alternative: palette.black,
};

const darkTheme = {
  main: palette.black,
  background: palette.dark_grey,
  alternative: palette.white_grey,
  trackCardGradient: palette.black,
  reviewCardTitle: palette.white_grey,
  placeholderColor: palette.grey,
  main_font: palette.light_grey,
  second_font: palette.light_grey,
  empty_star_color: palette.white_grey,
  copy_right: palette.white,
  keyboard_appearance: 'light',
  search_bar: searchBarDarkTheme,
  status_bar: statusBarDarkTheme,
};

const searchBarBaseTheme = {
  background: palette.white_blue,
  color: palette.blue,
  input: palette.light_blue,
};

const statusBarBaseTheme = {
  font_color: 'dark-content',
  main: palette.blue,
  background: palette.light_blue,
  alternative: palette.dark_blue,
};

const baseTheme = {
  main: palette.blue,
  background: palette.light_blue,
  alternative: palette.white_blue,
  trackCardGradient: palette.gradient_blue,
  reviewCardTitle: palette.dark_blue,
  placeholderColor: palette.midd_blue,
  main_font: palette.light_blue,
  second_font: palette.blue,
  empty_star_color: palette.blue,
  copy_right: palette.black,
  keyboard_appearance: 'light',
  search_bar: searchBarBaseTheme,
  status_bar: statusBarBaseTheme,

  shadow_color: palette.dark_grey,
};

// export const colors = darkTheme;
export const colors = baseTheme;
