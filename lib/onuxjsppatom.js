'use babel';

import OnuxjsppatomView from './onuxjsppatom-view';
import { CompositeDisposable } from 'atom';

export default {

  onuxjsppatomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.onuxjsppatomView = new OnuxjsppatomView(state.onuxjsppatomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.onuxjsppatomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'onuxjsppatom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.onuxjsppatomView.destroy();
  },

  serialize() {
    return {
      onuxjsppatomViewState: this.onuxjsppatomView.serialize()
    };
  },

  toggle() {
    console.log('Jspp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
