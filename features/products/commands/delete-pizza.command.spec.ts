import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Pizza } from '../entities/pizza.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DomainError } from '@infrastructure/errors/domain.error';
import { DeletePizzaCommand, DeletePizzaHandler } from './delete-pizza.command';

describe('delete pizza command', () => {
  let deletePizzaHandler: DeletePizzaHandler;
  let pizzaRepository: Repository<Pizza>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePizzaHandler,
        {
          provide: getRepositoryToken(Pizza),
          useValue: <Partial<Repository<Pizza>>>{
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    deletePizzaHandler = module.get<DeletePizzaHandler>(DeletePizzaHandler);
    pizzaRepository = module.get<Repository<Pizza>>(getRepositoryToken(Pizza));
  });

  it('should delete pizza entity', async () => {
    pizzaRepository.findOne = jest
      .fn()
      .mockResolvedValue(Pizza.create('Margarita', 10));

    const deletePizzaCommand = new DeletePizzaCommand();

    deletePizzaCommand.id = 1;

    await deletePizzaHandler.execute(deletePizzaCommand);

    expect(pizzaRepository.remove).toHaveBeenCalledTimes(1);
  });

  it('should throw domain error if pizza with same name already exists', async () => {
    pizzaRepository.findOne = jest.fn().mockResolvedValue(null);

    const deletePizzaCommand = new DeletePizzaCommand();

    deletePizzaCommand.id = 1;

    try {
      await deletePizzaHandler.execute(deletePizzaCommand);
      expect(false).toBeTruthy(); // we should never hit this line
    } catch (err) {
      expect(err).toBeInstanceOf(DomainError);
      expect(err.message).toEqual(
        `Pizza with id ${deletePizzaCommand.id} does not exist`,
      );
    }
  });
});
