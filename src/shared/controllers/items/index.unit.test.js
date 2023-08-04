const { faker } = require('@faker-js/faker')
const controller = require('.')
const Item = require('models/Item');
const Category = require('models/Category');

jest.spyOn(Item, 'create');
jest.spyOn(Item, 'findAll');

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

  describe('get_all', () => {
    it('retrieve and return all items', async () => {
      // Prepare
      const mock_category_1  = create_category();
      const category_1 = await Category.create(mock_category_1);

      const request_1 = {
        req: {
          body: JSON.stringify(create_item(category_1))
        },
        res: {
          body: null
        }
      }

      const request_2 = {
        req: {
          body: JSON.stringify(create_item(category_1))
        },
        res: {
          body: null
        }
      }

      const mock_category_2  = create_category();
      const category_2 = await Category.create(mock_category_2);
      const request_3 = {
        req: {
          body: JSON.stringify(create_item(category_2))
        },
        res: {
          body: null
        }
      }

      // create a items
      const response = await Promise.all([
        controller.post(request_1.req, request_1.res),
        controller.post(request_2.req, request_2.res),
        controller.post(request_3.req, request_3.res)
      ]);

      const items = response.map(item => JSON.parse(item.body))

      // Act
      const result = await controller.get_all({}, { body: null });

      // Assert
      expect(JSON.parse(result.body).length).toBe(response.length);
      expect(Item.findAll).toHaveBeenCalled();
      expect(JSON.parse(result.body)).toEqual(items);
    });
  });
});
