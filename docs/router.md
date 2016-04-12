This is how file paths is converted into routes (with default options: { default: 'index.js', param_prefix: '_'})

directory
  ├─ index.js         => /
  ├─ hello/
  │     └─ world.js   => /hello/world
  └─ _category/
        └─ _title.js  => /:category/:title