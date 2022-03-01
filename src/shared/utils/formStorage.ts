type FormState = { dirty: boolean; values: { [id: string]: unknown } };

type FormStorageState = {
  userId: string;
  forms: {
    [formName: string]: FormState;
  };
};

class FormStorage {
  private state: FormStorageState = {
    userId: '',
    forms: {},
  };

  public init(userId: string) {
    const storedUserId = sessionStorage.getItem(`formStorage_userId`);
    if (userId !== storedUserId) {
      this.reset(userId);
    }
    const state: FormStorageState = JSON.parse(
      sessionStorage.getItem(`formStorage_${userId}`) || `{}`,
    );
    if (Object.keys(state).length === 0) {
      this.reset(userId);
    }
    this.state = state;
    if (sessionStorage.getItem('formStorage_')) {
      sessionStorage.removeItem('formStorage_');
    }
    sessionStorage.setItem('hey-expert-form-storage-version', '1');
  }

  public update(formName: string, data: FormState): void {
    this.state.forms[formName] = data;
    sessionStorage.setItem(`formStorage_${this.state.userId}`, JSON.stringify(this.state));
  }

  public read(formName: string): FormState | undefined {
    if (this.state.userId) {
      const state: FormStorageState = JSON.parse(
        sessionStorage.getItem(`formStorage_${this.state.userId}`) || `{}`,
      );
      if (state) {
        this.state = state;
      }
      return this.state.forms[formName];
    }
    return undefined;
  }

  public remove(formName: string): void {
    delete this.state.forms[formName];
    sessionStorage.setItem(`formStorage_${this.state.userId}`, JSON.stringify(this.state));
  }

  public reset(userId?: string): void {
    if (userId) {
      this.state = {
        userId,
        forms: {},
      };
      sessionStorage.setItem(`formStorage_${this.state.userId}`, JSON.stringify(this.state));
      sessionStorage.setItem('formStorage_userId', userId);
    } else {
      sessionStorage.removeItem(`formStorage_${this.state.userId}`);
      sessionStorage.removeItem('formStorage_userId');
      this.state = { userId: '', forms: {} };
    }
  }
}

const formStorage = new FormStorage();

export default formStorage;
