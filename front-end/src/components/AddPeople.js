import React, { Component } from 'react';
import withRouter from './withRouter';
import NavBarMenu from "./NavBarMenu";

const Dropdown = ({ handleSelect, options, selectedPerson }) => {
  return (
    <div>
      <select className='form-select' onChange={handleSelect}>
        <option value="">Select a person</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      {selectedPerson && (
        <div>
          <p><strong>ID:</strong> {selectedPerson.id}</p>
          <p><strong>Name:</strong> {selectedPerson.name}</p>
          <p><strong>Age:</strong> {selectedPerson.age}</p>
          <p><strong>Email:</strong> {selectedPerson.email}</p>
        </div>
      )}
    </div>
  );
};

class AddPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      email: '',
      list: [],
      dropdownValue: '',
      selectedPerson: null,
      options: []
    };
  }

  componentDidMount() {
    this.fetchCurrentPeople();
  }

  fetchCurrentPeople() {
    console.warn("gruoo_id",this.props.router?.params.id);
    const groupId = parseInt(this.props.router?.params.id, 0);
    fetch('http://localhost:5100/FetchGroupDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({"id": groupId})
    })
      .then(result => result.json())
      .then(resp => {
        this.setState({ options: resp });
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedPerson = this.state.options.find(option => option.id === selectedId);
    this.setState({ dropdownValue: selectedId, selectedPerson });
  };

  create = () => {

    const { selectedPerson, list } = this.state;
    console.warn("gruoo_id",this.props.router?.params.id);
    const groupId = parseInt(this.props.router?.params.id, 0);
    // Check if a person is selected
    if (!selectedPerson) {
      alert("Please select a person from the dropdown.");
      return;
    }


    const payload = {
        id: selectedPerson.id,
        name: selectedPerson.name,
        age: selectedPerson.age,
        email: selectedPerson.email,
        group_id :groupId
      };

    console.warn("Add People this state",this.state)
    fetch('http://localhost:5100/AddPeopleInsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(result => result.json())
      .then(resp => {
        console.warn(resp);
        this.props.router.navigate(`/detail/${this.props.router.params.id}`);
      })
      .catch(error => {
        console.error("Error updating data: ", error);
      });
  };

  render() {
    const { dropdownValue, selectedPerson, options } = this.state;

    return (
      <div>
        <NavBarMenu />
        <h1>Add Existing People to Group</h1>
        <div className="d-flex justify-content-center mt-5">
          <div className="w- p-3 border rounded">
            <Dropdown
              handleSelect={this.handleSelect}
              options={options}
              selectedPerson={selectedPerson}
            />
          </div>
          <button onClick={this.create}>Add People</button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddPeople);
