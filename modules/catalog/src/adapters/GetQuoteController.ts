import { Controller } from "@clean-architecture/shared-kernel";

import type { GetQuoteRequestModel } from "../useCases/GetQuoteUseCase";

export class GetQuoteController extends Controller<GetQuoteRequestModel> {}
