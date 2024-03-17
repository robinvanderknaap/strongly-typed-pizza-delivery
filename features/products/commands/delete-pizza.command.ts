import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from '../entities/pizza.entity';
import { Repository } from 'typeorm';
import { DomainError } from '@infrastructure/errors/domain.error';

export class DeletePizzaCommand {
  public id: number;
}

@CommandHandler(DeletePizzaCommand)
export class DeletePizzaHandler implements ICommandHandler<DeletePizzaCommand> {
  constructor(
    @InjectRepository(Pizza) private readonly repository: Repository<Pizza>,
  ) {}

  async execute(command: DeletePizzaCommand) {
    const { id } = command;

    const pizza = await this.repository.findOne({ where: { id: id } });

    if (!pizza) {
      throw new DomainError(`Pizza with id ${id} does not exist`);
    }

    await this.repository.remove(pizza);
  }
}
