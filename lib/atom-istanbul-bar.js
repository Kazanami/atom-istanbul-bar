'use babel';

import AtomIstanbulBarView from './atom-istanbul-bar-view';
import { CompositeDisposable } from 'atom';
import * as configData from './config.json'
export default {

  atomIstanbulBarView: null,
  modalPanel: null,
  subscriptions: null,
  config: configData,

  activate(state) {
    this.atomIstanbulBarView = new AtomIstanbulBarView(state.atomIstanbulBarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomIstanbulBarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-istanbul-bar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomIstanbulBarView.destroy();
  },

  serialize() {
    return {
      atomIstanbulBarViewState: this.atomIstanbulBarView.serialize()
    };
  },

  toggle() {
    console.log('AtomIstanbulBar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
