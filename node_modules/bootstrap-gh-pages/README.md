# bootstrap-gh-pages

  > [Bootstrap](http://getbootstrap.com) custom build without scripts and icons

  For my own github pages

## Install

```sh
npm install --save bootstrap-gh-pages
```

## Usage

  Create `index.css`:

```css
@import "bootstrap-gh-pages";

body {
  color: #000;
}
```

  Make `build.css` with [postcss][postcss] and [postcss-import][postcss-import]:

```sh
postcss --use postcss-import index.css > build.css
```

## License

  MIT

[postcss]: https://github.com/postcss/postcss
[postcss-import]: https://github.com/postcss/postcss-import
