import { Controller } from "@clean-architecture/shared-kernel";

import type { GetQuoteInputData } from "../useCases/GetQuoteUseCase";

export class GetQuoteController extends Controller<GetQuoteInputData> {}
