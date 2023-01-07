import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from "@ngx-translate/core";

export class MissingTranslation implements MissingTranslationHandler {
  public handle(key: MissingTranslationHandlerParams): string {
    return key.key;
  }
}
