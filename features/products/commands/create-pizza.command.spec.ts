import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePizzaCommand, CreatePizzaHandler } from './create-pizza.command';
import { Pizza } from '../entities/pizza.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topping } from '../constants/toppings.enum';
import { DomainError } from '@infrastructure/errors/domain.error';

describe('create pizza command', () => {
  let createPizzaHandler: CreatePizzaHandler;
  let pizzaRepository: Repository<Pizza>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePizzaHandler,
        {
          provide: getRepositoryToken(Pizza),
          useValue: <Partial<Repository<Pizza>>>{
            exists: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createPizzaHandler = module.get<CreatePizzaHandler>(CreatePizzaHandler);
    pizzaRepository = module.get<Repository<Pizza>>(getRepositoryToken(Pizza));
  });

  it('should create pizza entity', async () => {
    pizzaRepository.exists = jest.fn().mockResolvedValue(false);

    const createPizzaCommand = new CreatePizzaCommand();

    createPizzaCommand.name = 'Margarita';
    createPizzaCommand.price = 10;
    createPizzaCommand.toppings = [Topping.Anchovies, Topping.Bacon];

    await createPizzaHandler.execute(createPizzaCommand);

    expect(pizzaRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw domain error if pizza with same name already exists', async () => {
    pizzaRepository.exists = jest.fn().mockResolvedValue(true);

    const createPizzaCommand = new CreatePizzaCommand();

    createPizzaCommand.name = 'Margarita';
    createPizzaCommand.price = 10;
    createPizzaCommand.toppings = [Topping.Anchovies, Topping.Bacon];

    try {
      await createPizzaHandler.execute(createPizzaCommand);
      expect(false).toBeTruthy(); // we should never hit this line
    } catch (err) {
      expect(err).toBeInstanceOf(DomainError);
      expect(err.message).toEqual(`Pizza with this name already exists`);
    }
  });
});
