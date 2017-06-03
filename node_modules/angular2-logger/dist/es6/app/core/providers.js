import { Options, Logger } from "./logger";
import { Level } from "./level";
export const OFF_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.OFF } }, Logger];
export const ERROR_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.ERROR } }, Logger];
export const WARN_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.WARN } }, Logger];
export const INFO_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.INFO } }, Logger];
export const DEBUG_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.DEBUG } }, Logger];
export const LOG_LOGGER_PROVIDERS = [{ provide: Options, useValue: { level: Level.LOG } }, Logger];
//# sourceMappingURL=providers.js.map