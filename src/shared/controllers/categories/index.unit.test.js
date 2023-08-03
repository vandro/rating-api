const { faker } = require('@faker-js/faker')
const controller = require('.')
const Category = require('models/Category');

jest.spyOn(Category, 'create');
jest.spyOn(Category, 'findByPk');

const create_category = () => ({
  name: faker.word.adjective(),
  attributes: [
      faker.word.adjective(),
      faker.word.adjective()
  ],
});

describe('Controller categories', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await Category.destroy({ where: {}, truncate: true });
  });

  describe('post', () => {
    it('create and return a new category',  async () => {
        // Prepare
        const mock_category  = create_category();

        // prepare payload
        const req = {
          body: JSON.stringify({
              name: mock_category.name,
              attributes: mock_category.attributes
          })
        }
      
        // Act
        const result = await controller.post(req, { body: null});

        // Assert
        expect(JSON.parse(result.body)).toMatchObject(mock_category);
        expect(Category.create).toHaveBeenCalledWith(mock_category);
    });
  });

  describe('get_by_id', () => {
    it('retrieve and return a category by ID', async () => {
      // Prepare
      const new_category = create_category();
      
      // create a category
      let response = await controller.post({
        body: JSON.stringify(new_category)
      }, {
        body: null
      });
      const category = JSON.parse(response.body)

      // Act
      const result = await controller.get_by_id({
        params:{
          id: category.id
        }
      }, { body: null});
      // Assert
      expect(JSON.parse(result.body)).toMatchObject(new_category);
      expect(Category.findByPk).toHaveBeenCalledWith(category.id);
    });
  });
});
