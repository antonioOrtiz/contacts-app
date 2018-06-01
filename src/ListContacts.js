import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// prettier-ignore
export default class ListContacts extends Component {

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }

  state = {
    query : ''
  }

  updateQuery = (query) => {
    this.setState(()=> ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render(){
    var {query} = this.state
    var {contacts, onDeleteContact} = this.props
    var showContacts = query === '' ? contacts : contacts.filter((c)=> (c.name.toLowerCase().includes(query.toLowerCase())))
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search Contacts"
            value={this.state.query}
            onChange={(event)=> this.updateQuery(event.target.value)}
          />
          <Link to='/create' className="add-contact">Add Contact</Link>
        </div>

        {showContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {showContacts.map((contact, index) => (
            <li key={index} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}>
              </div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
              onClick={()=>onDeleteContact(contact)}
              className="contact-remove">Remove</button>
            </li>))}
        </ol>
      </div>
    );
  }
}
