'use babel';

import OnuxjsppView from './onuxjspp-view';
import { CompositeDisposable } from 'atom';

export default {

  onuxjsppView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.onuxjsppView = new OnuxjsppView(state.onuxjsppViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.onuxjsppView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'onuxjspp:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.onuxjsppView.destroy();
  },

  serialize() {
    return {
      onuxjsppViewState: this.onuxjsppView.serialize()
    };
  },

  toggle() {
    console.log('Onuxjspp was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
