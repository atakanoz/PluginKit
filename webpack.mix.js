const mix = require('laravel-mix');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const StyleLintPlugin = require('stylelint-webpack-plugin');

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
  });

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
  });

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
      new CopyWebpackPlugin({
        patterns: [
          { from: "source/images", to: "images" },
          { from: "source/icons", to: "icons" },
          { from: "source/fonts", to: "fonts" },
        ],
      }),
      new ImageminPlugin({
        test: /\.(jpe?g|png|jpg|gif|svg)$/i,
        plugins: [
          imageminMozjpeg({
            quality: 80,
          })
        ]
      }),
      new StyleLintPlugin({
        files: './source/styles/**/*.scss',
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
