import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from "@ngx-translate/core";

export class MissingTranslation implements MissingTranslationHandler {
  public handle(key: MissingTranslationHandlerParams): string {
    console.log("missing");
    return key.key;
  }
}
