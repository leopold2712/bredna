type FormSaverState = {
  user?: string;
  forms?: [];
};

class FormSaver {
  private user = '';

  private currentState: FormSaverState = {};

  public setUser(email: string) {
    this.user = email;
    const state = JSON.parse(localStorage.getItem(`experts_${email}`) || `{}`);
    if (Object.keys(state).length === 0) {
      state.user = this.user;
      state.forms = {};
      localStorage.setItem(`experts_${email}`, JSON.stringify(state));
    }
    this.currentState = state;
    localStorage.setItem('hey-expert-app-version', '1');
  }

  public remove(formName: string) {
    // @ts-ignore
    if (this.currentState.forms && this.currentState.forms[formName]) {
      const { forms } = this.currentState;
      // @ts-ignore
      delete forms[formName];
      const state = {
        user: this.user,
        forms,
      };
      localStorage.setItem(`experts_${this.user}`, JSON.stringify(state));
    }
  }

  public save(
    formName: string,
    data: { [key: string]: string | number | boolean | null | undefined },
  ) {
    const { forms } = this.currentState;
    // @ts-ignore
    forms[formName] = data;
    const state = {
      user: this.user,
      forms,
    };
    localStorage.setItem(`experts_${this.user}`, JSON.stringify(state));
  }

  public get(formName: string) {
    // @ts-ignore
    return this.currentState.forms && this.currentState.forms[formName];
  }

  public update(formName: string) {
    const form = JSON.parse(localStorage.getItem(formName) || `{}`);
    if (form.dirty) {
      this.save(formName, form.values);
    } else {
      this.remove(formName);
    }
    localStorage.removeItem(formName);
  }
}

const formSaver = new FormSaver();

export default formSaver;
