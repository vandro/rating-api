const controller = require('./categories')
const Category = require('models/Category');

jest.spyOn(Category, 'create');


const create_mock_category = () => ({
    name: 'banana',
    attributes: [
        'local',
        'price'
    ],
});

describe('Controller categories', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    res = { body: null};
    req = { 
        body: null,
        params: {}
    };
  });

  describe('post', () => {
    it('create and return a new category',  async () => {
        // Prepare
        const mock_category  = create_mock_category();

        // prepare payload
        req.body = {
            name: mock_category.name,
            attributes: mock_category.attributes
        }
      
        // Act
        const result = await controller.post(req, res);

        // Assert
        expect(result.body).toMatchObject(mock_category);
        expect(Category.create).toHaveBeenCalledWith(mock_category);
    });
  });
});
