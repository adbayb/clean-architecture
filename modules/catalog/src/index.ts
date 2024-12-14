import { GetQuoteUseCase } from "./useCases/GetQuoteUseCase";
import { QuoteEntityGateway } from "./entities/QuoteEntityGateway";
import { GetQuotePresenter } from "./adapters/GetQuotePresenter";
import { GetQuoteController } from "./adapters/GetQuoteController";

// Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
const presenter = new GetQuotePresenter({}, console.log);
const gateway = new QuoteEntityGateway();
const useCase = new GetQuoteUseCase(gateway, presenter);
const controller = new GetQuoteController(useCase);

void controller.execute({ id: "test" });
