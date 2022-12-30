// import { TranslationLoader } from './translationLoader';
// import { MissingTranslation } from './missingTranslations';
// import {
//   TranslateService,
//   TranslateStore,
//   TranslateDefaultParser,
//   TranslateFakeCompiler,
// } from '@ngx-translate/core';

// import { TranslateDefaultParser } from '@ngx-translate/core';

// export function TranslateServiceFactory(
//   loader: any,
//   parser: any,
//   handler: any
// ) {
//   if (!(<any>window).translateService) {
//     (<any>window).translateService = new TranslateService(
//       new TranslateStore(),
//       loader,
//       new TranslateFakeCompiler(),
//       parser,
//       new MissingTranslation(),
//       handler,
//       true,
//       false,
//       'en'
//     );

//     (<any>window).translateService.addLangs(['en', 'lv']);
//     (<any>window).translateService.use(
//       "en"
//     );
//   }
//   return (<any>window).translateService;
// }

// export function TranslationLoaderFactory() {
//   if (!(<any>window).translationLoader) {
//     (<any>window).translationLoader = new TranslationLoader();
//   }
//   return (<any>window).translationLoader;
// }

// export function TranslationParserFactory() {
//   if (!(<any>window).translationParser) {
//     (<any>window).translationParser = new TranslateDefaultParser();
//   }
//   return (<any>window).translationParser;
// }

// export function MissingTranslationHandlerFactory() {
//   if (!(<any>window).missingTranslationHandler) {
//     (<any>window).missingTranslationHandler = new MissingTranslation();
//   }
//   return (<any>window).missingTranslationHandler;
// }

// export function InitTranslateServices() {
//   MissingTranslationHandlerFactory();
//   TranslationLoaderFactory();
//   TranslationParserFactory();
//   TranslateServiceFactory(
//     (<any>window).translationLoader,
//     (<any>window).translationParser,
//     (<any>window).missingTranslationHandler
//   );
// }
