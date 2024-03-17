import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Topping } from '../constants/toppings.enum';
import { Pizza } from '../entities/pizza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainError } from '@infrastructure/errors/domain.error';

export class CreatePizzaCommand {
  public name: string;
  public description: string;
  public price: number;
  public toppings: Array<Topping>;
}

@CommandHandler(CreatePizzaCommand)
export class CreatePizzaHandler implements ICommandHandler<CreatePizzaCommand> {
  constructor(
    @InjectRepository(Pizza)
    private repository: Repository<Pizza>,
  ) {}

  async execute(command: CreatePizzaCommand) {
    const { name, description, price, toppings } = command;

    if (
      await this.repository.exists({
        where: { name: name?.trim() },
      })
    ) {
      throw new DomainError('Pizza with this name already exists');
    }

    const pizza = Pizza.create(name, price);

    pizza.description = description;
    pizza.addToppings(...toppings);

    await this.repository.save(pizza);
  }
}
