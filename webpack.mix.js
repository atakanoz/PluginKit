const mix = require('laravel-mix');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWatched = require('laravel-mix-copy-watched');

mix
  .setPublicPath('./');

/** ---------------------------------------------------
 * Admin Assets
 * Inc. styles, autoprefixer configs and static assets.
 ----------------------------------------------------*/
mix
  .sass(
    'resources/admin/source/styles/main.scss',
    'resources/admin/dist/styles.bundle.css',
    { sassOptions: { outputStyle: 'compressed' } }
  )
  .options({
    postCss: [
      require('css-declaration-sorter')({
        order: 'smacss'
      })
    ],
    autoprefixer: {
      options: {
        browsers: [
          'last 6 versions',
        ]
      }
    }
  })
  .copyDirectoryWatched('resources/admin/source/images', 'resources/admin/dist/images')
  .copyDirectoryWatched('resources/admin/source/icons', 'resources/admin/dist/icons')
  .copyDirectoryWatched('resources/admin/source/fonts', 'resources/admin/dist/fonts');

/** ---------------------------------------------------
 * Admin JS
 * Combine and minify Javascripts.
 ----------------------------------------------------*/
mix
  .combine([
    // 'source/scripts/includes/*',
    'resources/admin/source/scripts/admin.js'
  ],
    'resources/admin/dist/scripts.bundle.js'
);

/** ---------------------------------------------------
 * Public Assets
 * Inc. styles, autoprefixer configs and static assets.
 ----------------------------------------------------*/
mix
  .sass(
    'resources/public/source/styles/main.scss',
    'resources/public/dist/styles.bundle.css',
    { sassOptions: { outputStyle: 'compressed' } }
  )
  .options({
    postCss: [
      require('css-declaration-sorter')({
        order: 'smacss'
      })
    ],
    autoprefixer: {
      options: {
        browsers: [
          'last 6 versions',
        ]
      }
    }
  })
  .copyDirectoryWatched('resources/public/source/images', 'resources/public/dist/images')
  .copyDirectoryWatched('resources/public/source/icons', 'resources/public/dist/icons')
  .copyDirectoryWatched('resources/public/source/fonts', 'resources/public/dist/fonts');

/** ---------------------------------------------------
 * Public JS
 * Combine and minify Javascripts.
 ----------------------------------------------------*/
mix
  .combine([
    // 'source/scripts/includes/*',
    'resources/public/source/scripts/admin.js'
  ],
    'resources/public/dist/scripts.bundle.js'
  );

/** ---------------------------------------------------
 * Options
 * Post CSS and autoprefixer options.
 ----------------------------------------------------*/
mix
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-nested-ancestors'),
      require('postcss-nested'),
      require('postcss-import'),
      require('tailwindcss'),
      require('autoprefixer'),
    ]
  });

/** ---------------------------------------------------
 * Webpack Config
 * Custom webpack config block.
 ----------------------------------------------------*/
mix
  .webpackConfig({
    plugins: [
      new StyleLintPlugin({
        files: [
          './resources/admin/source/styles/**/*.scss',
          './resources/public/source/styles/**/*.scss'
        ],
        configFile: './.stylelintrc'
      }),
    ]
  });

/** ---------------------------------------------------
 * Browsersync
 ----------------------------------------------------*/
mix
  .browserSync({
    proxy: 'http://wp.local',
    open: 'external',
    port: 3000,
    files: [
      '*.php',
      'admin/**/*.php',
      'public/**/*.php',
      'includes/**/*.php',
      'resources/**/**/*',
    ]
  });

/** ---------------------------------------------------
 * Extras
 ----------------------------------------------------*/
mix
  .disableNotifications();

mix
  .version();
