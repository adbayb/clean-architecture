export { GetQuotePresenter } from "./adapters/GetQuotePresenter";
export { GetQuoteController } from "./adapters/GetQuoteController";
export { GetQuoteUseCase } from "./useCases/GetQuoteUseCase";
export { QuoteEntityGateway } from "./entities/QuoteEntityGateway";
export { CatalogDependencyInjection, useGetQuote } from "./frameworks/react";

/*
 * // Drafted control flow following [Clean architecture diagram (from the book)](https://i.sstatic.net/K44FQ.jpg):
 *const presenter = new GetQuotePresenter(console.log);
 *const gateway = new QuoteEntityGateway();
 *const useCase = new GetQuoteUseCase(gateway, presenter);
 *const controller = new GetQuoteController(useCase);
 *
 *void controller.execute({ id: "test" });
 */
