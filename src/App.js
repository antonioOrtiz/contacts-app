import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContent from './CreateContact';

class App extends Component {
  state = {
    contacts: [],
    screen: 'list',
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({
        contacts,
      }));
    });
  }

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c => {
        return c.id !== contact.id;
      }),
    }));
    ContactsAPI.remove(contact);
  };

  // prettier-ignore
  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
         <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          onNavigate={()=>{
            this.setState(()=>({
              screen: 'create'
            }))
          }}
        />
        )}
        {this.state.screen === 'create' && (<CreateContent/>)}
      </div>
    );
  }
}

export default App;
