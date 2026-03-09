/**
 * @psl/logger - Logging Utilities
 * 
 * Simple colored logging with different levels
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

/**
 * Logger class with colored output
 */
export class Logger {
  private level: LogLevel;
  private prefix: string;
  private timestamp: boolean;
  
  private levels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    success: 1,
  };
  
  constructor(options: LoggerOptions = {}) {
    this.level = options.level || 'info';
    this.prefix = options.prefix || '';
    this.timestamp = options.timestamp ?? false;
  }
  
  private shouldLog(level: LogLevel): boolean {
    return this.levels[level] >= this.levels[this.level];
  }
  
  private format(level: LogLevel, message: string): string {
    const parts: string[] = [];
    
    if (this.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }
    
    if (this.prefix) {
      parts.push(`[${this.prefix}]`);
    }
    
    parts.push(`[${level.toUpperCase()}]`);
    parts.push(message);
    
    return parts.join(' ');
  }
  
  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.format('debug', message), ...args);
    }
  }
  
  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.format('info', message), ...args);
    }
  }
  
  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.format('warn', message), ...args);
    }
  }
  
  error(message: string, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.format('error', message), ...args);
    }
  }
  
  success(message: string, ...args: any[]): void {
    if (this.shouldLog('success')) {
      console.log(this.format('success', message), ...args);
    }
  }
  
  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

/**
 * Create a logger instance
 */
export function createLogger(options?: LoggerOptions): Logger {
  return new Logger(options);
}

/**
 * Default logger instance
 */
export const logger = createLogger({ prefix: 'PSL' });
