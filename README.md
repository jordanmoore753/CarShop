# Car Shop with Filtering

This application is an exercise in creating a stateful SPA. 

## CarShop

**CarShop** features a grid of cars. These cars have the following schema:

- Make
- Model
- Price
- Year of Manufacture

Each car in the grid features the following information:

- Image
- Make and Model
- Price
- Year of Make

## Users

Users can filter the cars in the grid by the following criteria:

- Make
- Model
- Year
- Price

When users select an option in the Make `select` tag, it should narrow the number of options in the Model `select`. Next, the Model `select` option should narrow the Price options. The Year `options` should be narrowed by the selection of the Price.

The car grid should fitler asynchronously as `options` are selected in the filter menu. No `filter` button necessary.

