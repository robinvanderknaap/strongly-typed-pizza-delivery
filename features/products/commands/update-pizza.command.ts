import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from '../entities/pizza.entity';
import { Not, Repository } from 'typeorm';
import { Topping } from '../constants/toppings.enum';
import { DomainError } from '@infrastructure/errors/domain.error';

export class UpdatePizzaCommand {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public toppings: Array<Topping>;
}

@CommandHandler(UpdatePizzaCommand)
export class UpdatePizzaHandler implements ICommandHandler<UpdatePizzaCommand> {
  constructor(
    @InjectRepository(Pizza) private readonly repository: Repository<Pizza>,
  ) {}

  async execute(command: UpdatePizzaCommand) {
    const { id, name, description, price, toppings } = command;

    if (
      await this.repository.exists({
        where: {
          id: Not(id),
          name: name?.trim(),
        },
      })
    ) {
      throw new DomainError('Pizza with this name already exists');
    }

    const pizza = await this.repository.findOne({ where: { id: id } });

    if (pizza === null) {
      throw new DomainError(`Pizza with id ${id} does not exist`);
    }

    pizza.name = name;
    pizza.description = description;
    pizza.price = price;
    pizza.addToppings(...toppings);

    await this.repository.save(pizza);
  }
}
