const deviceSizes = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
};

export default {
  breakpoints: {
    small: `(min-width: ${ deviceSizes.small }px)`,
    medium: `(min-width: ${ deviceSizes.medium }px)`,
    large: `(min-width: ${ deviceSizes.large }px)`,
    xlarge: `(min-width: ${ deviceSizes.xlarge }px)`,
  },
  colors: {
    primary: '#6a77f2',
    black: '#0D0D0D',
  },
  fonts: {
    largeHeading: "'Staatliches', cursive",
    smallHeading: "'Rubik', sans-serif",
    body: "'Heebo', sans-serif",
  },
};
