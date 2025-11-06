type Address = {
  id: string;
  houseNumber: string;
  street: string;
  barangayName: string;
  municipal: string;
  province: string;
};

class AddressStore {
  private addresses: Address[] = [];

  getAddresses() {
    return this.addresses;
  }

  addAddress(address: Omit<Address, 'id'>) {
    const newAddress: Address = { id: `${Date.now()}`, ...address };
    this.addresses.push(newAddress);
    console.log('[addressStore] added', newAddress);
    return newAddress;
  }

  deleteAddress(id: string) {
    const before = this.addresses.length;
    this.addresses = this.addresses.filter(a => a.id !== id);
    console.log(`[addressStore] deleted ${id} (before=${before}, after=${this.addresses.length})`);
  }

  clear() {
    this.addresses = [];
  }
}

export const addressStore = new AddressStore();
export type { Address };

