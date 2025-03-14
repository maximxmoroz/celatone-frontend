import { makeAutoObservable } from "mobx";
import { isHydrated, makePersistable } from "mobx-persist-store";

import type { Addr, Dict } from "lib/types";

export interface CodeLocalInfo {
  id: number;
  uploader: Addr;
  name?: string;
}

export class CodeStore {
  private userKey: string;

  savedCodeIds: Dict<string, number[]>;

  codeInfo: Dict<string, Record<number, CodeLocalInfo>>;

  constructor() {
    this.savedCodeIds = {};
    this.codeInfo = {};
    this.userKey = "";

    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: "CodeStore",
      properties: ["savedCodeIds", "codeInfo"],
    });
  }

  get isHydrated(): boolean {
    return isHydrated(this);
  }

  isCodeUserKeyExist(): boolean {
    return !!this.userKey;
  }

  setCodeUserKey(userKey: string) {
    this.userKey = userKey;
  }

  getCodeLocalInfo(id: number): CodeLocalInfo | undefined {
    return this.codeInfo[this.userKey]?.[id];
  }

  isCodeIdSaved(id: number): boolean {
    return this.savedCodeIds[this.userKey]?.includes(id) ?? false;
  }

  lastSavedCodeIds(userKey: string): number[] {
    return this.savedCodeIds[userKey]?.slice().reverse() ?? [];
  }

  lastSavedCodes(userKey: string): CodeLocalInfo[] {
    const savedCodeIdsByUserKey = this.savedCodeIds[userKey];

    if (!savedCodeIdsByUserKey) return [];

    return savedCodeIdsByUserKey
      .map((codeId) => ({
        id: codeId,
        uploader: this.codeInfo[userKey]?.[codeId]?.uploader ?? ("N/A" as Addr),
        name: this.codeInfo[userKey]?.[codeId]?.name,
      }))
      .reverse();
  }

  saveNewCode(id: number): void {
    if (this.savedCodeIds[this.userKey]) {
      this.savedCodeIds[this.userKey]?.push(id);
    } else {
      this.savedCodeIds[this.userKey] = [id];
    }
  }

  removeSavedCode(id: number): void {
    this.savedCodeIds[this.userKey] = this.savedCodeIds[this.userKey]?.filter(
      (each) => each !== id
    );
  }

  updateCodeInfo(id: number, uploader: Addr, name?: string): void {
    const codeInfo = this.codeInfo[this.userKey]?.[id] || { id, uploader };

    if (name !== undefined) {
      codeInfo.name = name.trim().length ? name.trim() : undefined;
    }

    this.codeInfo[this.userKey] = {
      ...this.codeInfo[this.userKey],
      [id]: codeInfo,
    };
  }
}
