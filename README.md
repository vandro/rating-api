# Item Recommendation API

This is the README for the Item Recommendation API, which provides endpoints for handling items, categories, ratings, and item recommendations.

## API Documentation

The API documentation is written using the Swagger OpenAPI Specification version 3.0.0. Below, you will find details about the available endpoints, request/response formats, and data models used in the API.

## Endpoints

### `/items`

- **POST**: Create a new item.
  - Request Body: JSON object representing the new item. The schema can be found in the `Item` data model.
  - Response: 200 OK with the JSON representation of the created item.

- **GET**: Get a list of all items.
  - Response: 200 OK with an array of JSON objects representing the items. Each item follows the `Item` data model.

### `/items/{itemId}`

- **GET**: Get an item by its ID.
  - Path Parameter: `itemId` (string) - ID of the item to retrieve.
  - Response: 200 OK with the JSON representation of the requested item.

- **PUT**: Update an existing item.
  - Path Parameter: `itemId` (string) - ID of the item to update.
  - Request Body: JSON object representing the updated item. The schema can be found in the `Item` data model.
  - Response: 200 OK with the JSON representation of the updated item.

- **DELETE**: Delete an item.
  - Path Parameter: `itemId` (string) - ID of the item to delete.
  - Response: 200 OK indicating the successful deletion of the item.

### `/categories`

- **POST**: Create a new category.
  - Request Body: JSON object representing the new category. The schema can be found in the `Category` data model.
  - Response: 200 OK with the JSON representation of the created category.

- **GET**: Get a list of all categories.
  - Response: 200 OK with an array of JSON objects representing the categories. Each category follows the `Category` data model.

### `/categories/{categoryId}`

- **GET**: Get a category by its ID.
  - Path Parameter: `categoryId` (string) - ID of the category to retrieve.
  - Response: 200 OK with the JSON representation of the requested category.

- **PUT**: Update an existing category.
  - Path Parameter: `categoryId` (string) - ID of the category to update.
  - Request Body: JSON object representing the updated category. The schema can be found in the `Category` data model.
  - Response: 200 OK with the JSON representation of the updated category.

- **DELETE**: Delete a category.
  - Path Parameter: `categoryId` (string) - ID of the category to delete.
  - Response: 200 OK indicating the successful deletion of the category.

### `/ratings`

- **POST**: Create a new rating.
  - Request Body: JSON object representing the new rating. The schema can be found in the `Rating` data model.
  - Response: 200 OK with the JSON representation of the created rating.

### `/recommendations`

- **GET**: Get item recommendations based on a category.
  - Request Body: JSON object representing the category for which recommendations are needed. The schema can be found in the `RecommendationRequest` data model.
  - Response: 200 OK with an array of JSON objects representing the recommended items. Each item follows the `Item` data model.

## Data Models

### `Item`

- Type: object
- Properties:
  - `id` (string, readOnly): The unique ID of the item.
  - `name` (string): The name of the item.
  - `category` (string): The category to which the item belongs.
  - `attributes` (object): Additional properties of the item.

### `Category`

- Type: object
- Properties:
  - `id` (string, readOnly): The unique ID of the category.
  - `name` (string): The name of the category.
  - `attributes` (array of strings): List of attributes associated with the category.

### `Rating`

- Type: object
- Properties:
  - `itemId` (string): The ID of the item being rated.
  - `value` (number): The rating value. Must be between 0 and 1.

### `RecommendationRequest`

- Type: object
- Properties:
  - `category` (string): The category for which recommendations are requested.

## Getting Started

To use the Item Recommendation API, you need to have the API running and accessible. You can find instructions on how to set up and run the API in the project's documentation.

## License

This API is open-source and licensed under the Apache License, Version 2.0.

## Contributions

Contributions to this API are welcome! Please follow the guidelines in the project's repository for submitting issues and pull requests.

## Contact

For any questions or feedback related to the API, you can contact the project maintainers at business@chuva.io.

Thank you for using the Item Recommendation API! Happy coding!
