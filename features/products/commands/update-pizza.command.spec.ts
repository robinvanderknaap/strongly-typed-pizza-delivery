import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Pizza } from '../entities/pizza.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DomainError } from '@infrastructure/errors/domain.error';
import { UpdatePizzaCommand, UpdatePizzaHandler } from './update-pizza.command';
import { Topping } from '../constants/toppings.enum';

describe('update pizza command', () => {
  let updatePizzaHandler: UpdatePizzaHandler;
  let pizzaRepository: Repository<Pizza>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePizzaHandler,
        {
          provide: getRepositoryToken(Pizza),
          useValue: <Partial<Repository<Pizza>>>{
            findOne: jest.fn(),
            save: jest.fn(),
            exists: jest.fn(),
          },
        },
      ],
    }).compile();

    updatePizzaHandler = module.get<UpdatePizzaHandler>(UpdatePizzaHandler);
    pizzaRepository = module.get<Repository<Pizza>>(getRepositoryToken(Pizza));
  });

  it('should update pizza entity', async () => {
    pizzaRepository.exists = jest.fn().mockResolvedValue(false);
    pizzaRepository.findOne = jest
      .fn()
      .mockResolvedValue(Pizza.create('Margarita', 10));

    const updatePizzaCommand = new UpdatePizzaCommand();

    updatePizzaCommand.id = 1;
    updatePizzaCommand.name = 'Hawaii';
    updatePizzaCommand.price = 15;
    updatePizzaCommand.toppings = [Topping.Pineapple, Topping.Ham];

    await updatePizzaHandler.execute(updatePizzaCommand);

    expect(pizzaRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw domain error if pizza with same name already exists', async () => {
    pizzaRepository.exists = jest.fn().mockResolvedValue(true);

    const updatePizzaCommand = new UpdatePizzaCommand();

    updatePizzaCommand.id = 1;
    updatePizzaCommand.name = 'Hawaii';
    updatePizzaCommand.price = 15;
    updatePizzaCommand.toppings = [Topping.Pineapple, Topping.Ham];

    try {
      await updatePizzaHandler.execute(updatePizzaCommand);
      expect(false).toBeTruthy(); // we should never hit this line
    } catch (err) {
      expect(err).toBeInstanceOf(DomainError);
      expect(err.message).toEqual(`Pizza with this name already exists`);
    }
  });

  it('should throw domain error if pizza cannot be found', async () => {
    pizzaRepository.exists = jest.fn().mockResolvedValue(false);
    pizzaRepository.findOne = jest.fn().mockResolvedValue(null);

    const updatePizzaCommand = new UpdatePizzaCommand();

    updatePizzaCommand.id = 1;
    updatePizzaCommand.name = 'Hawaii';
    updatePizzaCommand.price = 15;
    updatePizzaCommand.toppings = [Topping.Pineapple, Topping.Ham];

    try {
      await updatePizzaHandler.execute(updatePizzaCommand);
      expect(false).toBeTruthy(); // we should never hit this line
    } catch (err) {
      expect(err).toBeInstanceOf(DomainError);
      expect(err.message).toEqual(
        `Pizza with id ${updatePizzaCommand.id} does not exist`,
      );
    }
  });
});
