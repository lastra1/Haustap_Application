class SettingsStore {
  private _ringtone: string = 'Honk (Default)';

  setRingtone(ringtone: string) {
    this._ringtone = ringtone;
    console.log('[settingsStore] setRingtone:', ringtone);
  }

  getRingtone() {
    return this._ringtone;
  }
}

export const settingsStore = new SettingsStore();
export type { SettingsStore };

