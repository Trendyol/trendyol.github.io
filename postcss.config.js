module.exports = ({ env }) => {
  const plugins = env === 'production'
    ? [require('autoprefixer'), require('cssnano')]
    : [require('autoprefixer')];
  return {
    plugins,
    map: false,
  };
};
