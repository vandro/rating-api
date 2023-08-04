const { faker } = require('@faker-js/faker')
const controller = require('.')
const Item = require('models/Item');
const Category = require('models/Category');

jest.spyOn(Item, 'create');

const create_category = () => ({
  name: faker.word.adjective(),
  attributes: [
    'fixed_attribute',
    faker.word.adjective(),
    faker.word.adjective()
  ],
});

const create_item = (category) => {
  const item_attributes = {};

  category.attributes.forEach((attribute) => {
    item_attributes[attribute] = faker.word.adjective();
  });

  return {
    category_id: category.id,
    name: faker.word.adjective(),
    attributes: item_attributes
  };
};

describe('Controller items', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    await Item.destroy({ where: {}, truncate: true });
    await Category.destroy({ where: {}, truncate: true });
  });

  describe('post', () => {
    describe('Success case', () => {
      it('create and return a new item', async () => {
        // Prepare
        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            category_id: mock_item.category_id,
            attributes: mock_item.attributes
          })
        };

        // Act
        const result = await controller.post(req, { body: null });

        // Assert
        expect(JSON.parse(result.body)).toMatchObject(mock_item);
        expect(Item.create).toHaveBeenCalledWith(mock_item);
      });
    });
    describe('Error cases', () => {
      it('return error if name is missing', async () => {
        // Prepare
        const expected_error = '"name" is required';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            category_id: mock_item.category_id,
            attributes: {
              fixed_attribute: faker.word.adjective()
            }
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });

      it('return error if category_id is missing', async () => {
        // Prepare
        const expected_error = '"category_id" is required';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            attributes: {
              fixed_attribute: faker.word.adjective()
            }
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });

      it('return error if attributes is missing', async () => {
        // Prepare
        const expected_error = '"attributes" is required';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            category_id: mock_item.category_id
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });

      it('return error when invalid request body is provided', async () => {
        // Prepare
        const expected_error = '"invalid_property" is not allowed';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            category_id: mock_item.category_id,
            attributes: mock_item.attributes,
            invalid_property: faker.word.adjective()
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });

      it('return error if item attributes do not match category attributes', async () => {
        // Prepare
        const expected_error = 'Invalid item attribute';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            category_id: mock_item.category_id,
            attributes: {
              fixed_attribute: faker.word.adjective()
            }
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });

      it('return error when invalid attribute is provided', async () => {
        // Prepare
        const expected_error = 'Invalid item attribute';

        const mock_category = create_category();
        const category = await Category.create(mock_category);
        const mock_item = create_item(category);

        // prepare payload
        const req = {
          body: JSON.stringify({
            name: mock_item.name,
            category_id: mock_item.category_id,
            attributes: {
              ...mock_item.attributes,
              invalid_property: faker.word.adjective()
            },
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Item.create).not.toHaveBeenCalled();
      });
    });
  });
});
