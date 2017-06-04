'use babel';

import HtmlShorcutsReactView from './html-shorcuts-react-view';
import { CompositeDisposable } from 'atom';

export default {

  htmlShorcutsReactView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.htmlShorcutsReactView = new HtmlShorcutsReactView(state.htmlShorcutsReactViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.htmlShorcutsReactView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-shorcuts-react:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.htmlShorcutsReactView.destroy();
  },

  serialize() {
    return {
      htmlShorcutsReactViewState: this.htmlShorcutsReactView.serialize()
    };
  },

  toggle() {
    console.log('HtmlShorcutsReact was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
