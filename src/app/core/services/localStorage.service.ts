import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public contains(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

}
